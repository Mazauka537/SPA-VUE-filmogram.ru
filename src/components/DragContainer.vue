<template>
  <div class="drag-container" ref="dragContainer">
    <slot></slot>
    <button class="drag-preview" v-show="draggedBlock" ref="dragPreview"></button>
  </div>
</template>

<script>

export default {
  props: {
    draggedGhostStyles: Object,
    disable: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    blocks: [],
    disabled: false,
    draggedBlock: undefined,
    blockUnderCursor: undefined,
    clickPositionX: undefined,
    clickPositionY: undefined,
  }),
  methods: {
    dragStart(block, mouseEvent) {
      if (this.disabled) return
      //set variables
      this.draggedBlock = block
      this.blockUnderCursor = block
      const draggedBlockRect = this.draggedBlock.getBoundingClientRect()
      this.clickPositionX = mouseEvent.x - draggedBlockRect.x
      this.clickPositionY = mouseEvent.y - draggedBlockRect.y

      this.blocks.forEach(block => {
        block.style.transition = 'transform 0.2s'
      })

      this.draggedBlock.style.height = this.draggedBlock.offsetHeight + 'px'
      for (let key in this.draggedGhostStyles) {
        this.draggedBlock.style[key] = this.draggedGhostStyles[key]
      }


      this.$refs.dragPreview.append(this.draggedBlock.firstElementChild)

      this.$refs.dragPreview.style.width = this.draggedBlock.offsetWidth + 'px'
      const [top, left] = this.getPreviewPosition(mouseEvent)
      this.$refs.dragPreview.style.top = top + 'px'
      this.$refs.dragPreview.style.left = left + 'px'

      //set events
      window.addEventListener('mousemove', this.dragMove)
      window.addEventListener('mouseup', this.dragEnd)
    },
    async dragEnd() {
      this.disabled = true

      let dropResult = {}
      dropResult.droppedElement = this.$refs.dragPreview.firstElementChild.firstElementChild
      dropResult.elementsCount = this.blocks.length

      dropResult.droppedElementOldIndex = Array.from(this.blocks).indexOf(this.draggedBlock)

      const [blockUnderCursorTop] = this.getBlockPosition(this.blockUnderCursor)
      const [draggedBlockTop] = this.getBlockPosition(this.draggedBlock)
      if (draggedBlockTop > blockUnderCursorTop) {
        this.$refs.dragContainer.insertBefore(this.draggedBlock, this.blockUnderCursor)
      } else {
        this.$refs.dragContainer.insertBefore(this.draggedBlock, this.blockUnderCursor.nextSibling)
      }

      this.blocks = this.$refs.dragContainer.querySelectorAll('.drag-block')
      dropResult.droppedElementNewIndex = Array.from(this.blocks).indexOf(this.draggedBlock)

      this.$emit('drop', dropResult)

      this.blocks.forEach(block => {
        block.style.removeProperty('transition')
        block.style.removeProperty('transform')
      })

      await this.$refs.dragPreview.animate([
        {
          left: this.$refs.dragPreview.offsetLeft + 'px',
          top: this.$refs.dragPreview.offsetTop + 'px',
        },
        {
          left: this.draggedBlock.getBoundingClientRect().x + 'px',
          top: this.draggedBlock.getBoundingClientRect().y + 'px',
        },
      ], {duration: 200, easing: 'ease'}).finished


      this.draggedBlock.append(this.$refs.dragPreview.firstElementChild)
      this.draggedBlock.style.removeProperty('height')
      for (let key in this.draggedGhostStyles) {
        this.draggedBlock.style.removeProperty(key)
      }

      //clear events
      window.removeEventListener('mousemove', this.dragMove)
      window.removeEventListener('mouseup', this.dragEnd)
      //clear variables
      this.draggedBlock = undefined
      this.blockUnderCursor = undefined
      this.clickPositionX = undefined
      this.clickPositionY = undefined
      this.disabled = false
    },
    dragMove(mouseEvent) {
      if (this.disabled) return

      const [draggedBlockStart, draggedBlockEnd] = this.getBlockPosition(this.draggedBlock)
      const cursorPosition = this.getCursorPosition(mouseEvent)

      const [top, left] = this.getPreviewPosition(mouseEvent)
      this.$refs.dragPreview.style.top = top + 'px'
      this.$refs.dragPreview.style.left = left + 'px'

      this.blockUnderCursor = Array.from(this.blocks).find(block => {
        const [blockStart, blockEnd] = this.getBlockPosition(block)
        if (cursorPosition >= blockStart && cursorPosition <= blockEnd) {
          return true
        }
      })
      const [blockUnderCursorStart, blockUnderCursorEnd] = this.getBlockPosition(this.blockUnderCursor)

      let isMoveUp = false
      if (cursorPosition < draggedBlockStart) {
        isMoveUp = true
      }

      let shiftingBlocks = []
      let notShiftingBlocks = []
      this.blocks.forEach(block => {
        if (block === this.draggedBlock)
          return

        const [blockStart, blockEnd] = this.getBlockPosition(block)

        if (isMoveUp) {
          if (blockStart < draggedBlockStart && blockStart >= blockUnderCursorStart) {
            shiftingBlocks.push(block)
          } else {
            notShiftingBlocks.push(block)
          }
        } else {
          if (blockEnd > draggedBlockEnd && blockEnd <= blockUnderCursorEnd) {
            shiftingBlocks.push(block)
          } else {
            notShiftingBlocks.push(block)
          }
        }
      })

      let offset = 0
      shiftingBlocks.forEach(block => {
        if (isMoveUp) {
          offset -= block.offsetHeight
        } else {
          offset += block.offsetHeight
        }
      })
      this.draggedBlock.style.transform = 'translateY(' + offset + 'px)'

      shiftingBlocks.forEach(block => {
        if (isMoveUp) {
          block.style.transform = 'translateY(' + this.draggedBlock.offsetHeight + 'px)'
        } else {
          block.style.transform = 'translateY(-' + this.draggedBlock.offsetHeight + 'px)'
        }
      })

      notShiftingBlocks.forEach(block => {
        block.style.removeProperty('transform')
      })
    },
    getCursorPosition(mouseEvent) {
      let cursorPositionInContainer = mouseEvent.y - this.$refs.dragContainer.offsetTop + window.scrollY
      if (cursorPositionInContainer < 0) cursorPositionInContainer = 0
      if (cursorPositionInContainer > this.$refs.dragContainer.offsetHeight) cursorPositionInContainer = this.$refs.dragContainer.offsetHeight
      return cursorPositionInContainer
    },
    getBlockPosition(block) {
      const blockStartPosition = block.offsetTop
      const blockEndPosition = block.offsetTop + block.offsetHeight
      return [blockStartPosition, blockEndPosition]
    },
    getPreviewPosition(mouseEvent) {
      const top = mouseEvent.y - this.clickPositionY
      const left = mouseEvent.x - this.clickPositionX
      return [top, left]
    }
  },
  updated() {
    this.blocks = this.$refs.dragContainer.querySelectorAll('.drag-block')

    if (!this.disable) {
      this.blocks.forEach(block => {
        if (block.firstElementChild)
          block.firstElementChild.onmousedown = (mouseEvent) => this.dragStart(block, mouseEvent)
      })
    } else {
      this.blocks.forEach(block => {
        if (block.firstElementChild)
          block.firstElementChild.onmousedown = undefined
      })
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
