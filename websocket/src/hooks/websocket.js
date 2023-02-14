import { WS_ADDRESS } from '../config/index'

// 封装websocket逻辑。handleMessage事件回调函数由外面传来，来处理message事件。
function useWebSocket (handleMessage) {
      // 实例化WebSocket，参数为后端的websocket服务的地址。
      const ws = new WebSocket(WS_ADDRESS); 

      // init封装函数执行的过程，使函数结构模块化程度更高。
      const init = () => {
            bindEvent()
      }

      //给ws绑定事件，当ws触发指定的事件时，指定的回调函数就会被执行。
      function bindEvent () {
            ws.addEventListener('open', handleOpen, false);
            ws.addEventListener('close', handleClose, false);
            ws.addEventListener('error', handleError, false);
            ws.addEventListener('message', handleMessage, false);
      }

      function handleOpen (e) {
            console.log('Webpack open', e)
      }

      function handleClose (e) {
            console.log('Webpack close', e)
      }

      function handleError (e) {
            console.log('Webpack error', e)
      }

      init();

      return ws;
};

export default useWebSocket;