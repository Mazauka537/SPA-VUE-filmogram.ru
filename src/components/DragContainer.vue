<template>
  <div class="drag-container" ref="elemDragContainer">
    <slot></slot>
    <button class="drag-preview" v-show="elemDraggedBlock" ref="elemDragPreview"></button>
  </div>
</template>

<script>

import {onUpdated, ref} from "vue";

export default {
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    scrollableBlock: Object
  },
  setup(props, {emit}) {
    const elemsBlocks = ref([])
    const disabled = ref(false)
    const elemDraggedBlock = ref(undefined)
    const elemBlockUnderCursor = ref(undefined)
    const clickPositionX = ref(undefined)
    const clickPositionY = ref(undefined)
    const elemDragContainer = ref(undefined)
    const elemDragPreview = ref(undefined)
    const elemScrollableBlock = ref(undefined)


    const dragStart = (elemBlock, pointerEvent) => {
      if (disabled.value) return

      //set variables
      elemDraggedBlock.value = elemBlock
      elemBlockUnderCursor.value = elemBlock
      const draggedBlockRect = elemDraggedBlock.value.getBoundingClientRect()
      clickPositionX.value = pointerEvent.x - draggedBlockRect.x
      clickPositionY.value = pointerEvent.y - draggedBlockRect.y

      elemsBlocks.value.forEach(elemBlock => {
        elemBlock.style.transition = 'transform 0.2s'
      })

      elemDraggedBlock.value.style.height = elemDraggedBlock.value.offsetHeight + 'px'

      elemDragPreview.value.append(elemDraggedBlock.value.firstElementChild)

      elemDragPreview.value.style.width = elemDraggedBlock.value.offsetWidth + 'px'
      const [top, left] = getPreviewPosition(pointerEvent)
      elemDragPreview.value.style.top = top + 'px'
      elemDragPreview.value.style.left = left + 'px'

      //set events
      window.addEventListener('pointermove', dragMove)
      window.addEventListener('pointerup', dragEnd)
    }

    const dragEnd = async () => {
      disabled.value = true

      let dropResult = {}
      dropResult.droppedElement = elemDragPreview.value.firstElementChild.firstElementChild
      dropResult.elementsCount = elemsBlocks.value.length

      dropResult.droppedElementOldIndex = Array.from(elemsBlocks.value).indexOf(elemDraggedBlock.value)

      const [blockUnderCursorTop] = getBlockPosition(elemBlockUnderCursor.value)
      const [draggedBlockTop] = getBlockPosition(elemDraggedBlock.value)
      if (draggedBlockTop > blockUnderCursorTop) {
        elemDragContainer.value.insertBefore(elemDraggedBlock.value, elemBlockUnderCursor.value)
      } else {
        elemDragContainer.value.insertBefore(elemDraggedBlock.value, elemBlockUnderCursor.value.nextSibling)
      }

      elemsBlocks.value = elemDragContainer.value.querySelectorAll('.drag-block')
      dropResult.droppedElementNewIndex = Array.from(elemsBlocks.value).indexOf(elemDraggedBlock.value)

      emit('drop', dropResult)

      elemsBlocks.value.forEach(block => {
        block.style.removeProperty('transition')
        block.style.removeProperty('transform')
      })

      await elemDragPreview.value.animate([
        {
          left: elemDragPreview.value.offsetLeft + 'px',
          top: elemDragPreview.value.offsetTop + 'px',
        },
        {
          left: elemDraggedBlock.value.getBoundingClientRect().x + 'px',
          top: elemDraggedBlock.value.getBoundingClientRect().y + 'px',
        },
      ], {duration: 200, easing: 'ease'}).finished


      elemDraggedBlock.value.append(elemDragPreview.value.firstElementChild)
      elemDraggedBlock.value.style.removeProperty('height')

      elemDragContainer.value.style.removeProperty('touch-action')

      //clear events
      window.removeEventListener('pointermove', dragMove)
      window.removeEventListener('pointerup', dragEnd)
      //clear variables
      elemDraggedBlock.value = undefined
      elemBlockUnderCursor.value = undefined
      clickPositionX.value = undefined
      clickPositionY.value = undefined
      disabled.value = false
    }

    const dragMove = (pointerEvent) => {
      if (disabled.value) return

      const [draggedBlockStart, draggedBlockEnd] = getBlockPosition(elemDraggedBlock.value)
      const cursorPosition = getCursorPosition(pointerEvent)

      const [top, left] = getPreviewPosition(pointerEvent)
      elemDragPreview.value.style.top = top + 'px'
      elemDragPreview.value.style.left = left + 'px'

      elemBlockUnderCursor.value = Array.from(elemsBlocks.value).find(block => {
        const [blockStart, blockEnd] = getBlockPosition(block)
        if (cursorPosition >= blockStart && cursorPosition <= blockEnd) {
          return true
        }
      })
      const [blockUnderCursorStart, blockUnderCursorEnd] = getBlockPosition(elemBlockUnderCursor.value)

      let isMoveUp = false
      if (cursorPosition < draggedBlockStart) {
        isMoveUp = true
      }

      let shiftingBlocks = []
      let notShiftingBlocks = []
      elemsBlocks.value.forEach(elemBlock => {
        if (elemBlock === elemDraggedBlock.value)
          return

        const [blockStart, blockEnd] = getBlockPosition(elemBlock)

        if (isMoveUp) {
          if (blockStart < draggedBlockStart && blockStart >= blockUnderCursorStart) {
            shiftingBlocks.push(elemBlock)
          } else {
            notShiftingBlocks.push(elemBlock)
          }
        } else {
          if (blockEnd > draggedBlockEnd && blockEnd <= blockUnderCursorEnd) {
            shiftingBlocks.push(elemBlock)
          } else {
            notShiftingBlocks.push(elemBlock)
          }
        }
      })

      let offset = 0
      shiftingBlocks.forEach(elemBlock => {
        if (isMoveUp) {
          offset -= elemBlock.offsetHeight
        } else {
          offset += elemBlock.offsetHeight
        }
      })
      elemDraggedBlock.value.style.transform = 'translateY(' + offset + 'px)'

      shiftingBlocks.forEach(elemBlock => {
        if (isMoveUp) {
          elemBlock.style.transform = 'translateY(' + elemDraggedBlock.value.offsetHeight + 'px)'
        } else {
          elemBlock.style.transform = 'translateY(-' + elemDraggedBlock.value.offsetHeight + 'px)'
        }
      })

      notShiftingBlocks.forEach(elemBlock => {
        elemBlock.style.removeProperty('transform')
      })
    }

    const getCursorPosition = (pointerEvent) => {
      let cursorPositionInContainer = pointerEvent.y - elemDragContainer.value.offsetTop + elemScrollableBlock.value.scrollTop
      if (cursorPositionInContainer < 0) cursorPositionInContainer = 0
      if (cursorPositionInContainer > elemDragContainer.value.offsetHeight) cursorPositionInContainer = elemDragContainer.value.offsetHeight
      return cursorPositionInContainer
    }
    const getBlockPosition = (elemBlock) => {
      const blockStartPosition = elemBlock.offsetTop
      const blockEndPosition = elemBlock.offsetTop + elemBlock.offsetHeight
      return [blockStartPosition, blockEndPosition]
    }
    const getPreviewPosition = (pointerEvent) => {
      const top = pointerEvent.y - clickPositionY.value
      const left = pointerEvent.x - clickPositionX.value
      return [top, left]
    }

    onUpdated(() => {
      elemScrollableBlock.value = props.scrollableBlock.elemScrollableBlock.querySelector('.ss-content')

      elemsBlocks.value = elemDragContainer.value.querySelectorAll('.drag-block')

      if (!props.disable) {
        elemsBlocks.value.forEach(elemBlock => {
          if (elemBlock.firstElementChild)
            elemBlock.firstElementChild.querySelector('.drag-block__grab').onpointerdown = (pointerEvent) => {
              dragStart(elemBlock, pointerEvent)
            }
        })
      } else {
        elemsBlocks.value.forEach(elemBlock => {
          if (elemBlock.firstElementChild)
            elemBlock.firstElementChild.querySelector('.drag-block__grab').onpointerdown = undefined
        })
      }
    })

    return {
      elemDraggedBlock,
      elemDragContainer,
      elemDragPreview
    }
  }
}
</script>

<style scoped lang="scss">
.drag-container {
  position: relative;
}

.drag-preview {
  position: fixed;
  display: block;
  border: none;
  background: transparent;
  text-align: left;
}

</style>
