/* eslint-disable */
const toast = {
  show(content = '', time = 2000, icon = false) {
    const $toast = $('#toast')
    if (!icon) {
      $toast.find('.weui_icon_toast').hide()
    }
    $toast.find('.weui_toast_content').html(content)
    $toast.show()
    setTimeout(() => {
      this.hide()
    }, time)
  },
  hide() {
    $('#toast').hide()
  }
}

const xconfirm = {
  inited: false,
  promise: null,
  show(title = '', content = '', option = { ok: '确认', cancel: '取消' }) {
    const $confirm = $('#confirm')
    const $title = $confirm.find('.weui_dialog_hd')
    this.promise = $.Deferred()
    if (!this.inited) {
      this.inited = true
      $confirm.find('.weui_btn_dialog.confirm').on('click', () => {
        this.hide()
        this.promise.resolve()
      })
      $confirm.find('.weui_btn_dialog.cancel').on('click', () => {
        this.hide()
        this.promise.reject()
      })
    }
    $title.html(title)
    $confirm.find('.weui_dialog_bd').html(content)
    $confirm.find('.weui_dialog_ft .cancel').html(option.cancel)
    $confirm.find('.weui_dialog_ft .confirm').html(option.ok)
    $confirm.show()
    return this.promise
  },
  hide() {
    $('#confirm').hide()
  }
}

const xalert = {
  inited: false,
  promise: null,
  show(title = '', content = '', button = true) {
    const $alert = $('#alert')
    const $title = $alert.find('.weui_dialog_hd')
    this.promise = $.Deferred()
    if (!this.inited) {
      this.inited = true
      $alert.find('.weui_btn_dialog').on('click', () => {
        this.hide()
        this.promise.resolve()
      })
    }
    $title.html(title)
    $alert.find('.weui_dialog_bd').html(content)
    if (button) {
      $alert.find('.weui_btn_dialog').show()
    } else {
      $alert.find('.weui_btn_dialog').hide()
    }
    $alert.show()
    return this.promise
  },
  hide() {
    $('#alert').hide()
  }
}

const loader = {
  que: 0,
  show() {
    this.que++
    if (this.que > 1) {
      return
    }
    $('#toast-loading').show()
  },
  hide() {
    this.que--
    if (this.que > 0) {
      return
    }
    $('#toast-loading').hide()
  }
}
export { toast, loader, xconfirm, xalert }
