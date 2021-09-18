import store from '@/store'

class WebSocketClient {
  constructor (config = {}) {
    const defaultConfig = {
      url: '127.0.0.1',
      port: '3001',
      protocol: 'ws',
      timeInterval: 5 * 1000
    }
    const finalConfig = { ...defaultConfig, ...config }
    this.ws = {}
    this.port = finalConfig.port
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
    this.handle = null
    this.timeInterval = finalConfig.timeInterval
  }

  init () {
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.ws.onopen = () => this.onOpen()
    this.ws.onmessage = (msg) => this.onMessage(msg)
    this.ws.onclose = () => this.onClose()
    this.ws.onerror = () => this.onError()
  }

  send (msg) {
    this.ws.send(msg)
  }

  onOpen () {
    this.send(JSON.stringify({
      event: 'auth',
      message: 'Bearer ' + store.state.token
    }))
    this.checkServer()
  }

  onMessage (event) {
    const obj = JSON.parse(event.data)
    switch (obj.event) {
      case 'noauth':
        // authorization fail
        // router to /login
        // this.$router.push({ name: 'login' })
        break
      case 'heartbeat':
        this.checkServer()
        this.ws.send(JSON.stringify({
          event: 'heartbeat',
          message: 'pong'
        }))
        break
      default:
        store.dispatch(obj.event, obj)
        break
    }
  }

  onError () {
    console.log('websocket连接失败！' + this.ws.readyState)
    setTimeout(() => {
      this.init()
    }, 1000)
  }

  onClose () {
    console.log('已关闭websocket！' + this.ws.readyState)
    this.ws.close()
  }

  checkServer () {
    clearTimeout(this.handle)
    this.handle = setTimeout(() => {
      this.onClose()
      this.onError()
    }, this.timeInterval + 1000)
  }
}

export default WebSocketClient
