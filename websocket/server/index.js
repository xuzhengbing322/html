const WebSocket = require('ws');

// 实例化WebSocket中的Server构造函数，参数为{ port: 8000 }端口号。
;((Ws) => {
      const server = new Ws.Server({ port: 8000 });

      const init = () => {
            bindEvent();
      }

      function bindEvent () {
            server.on('open', handleOpen);
            server.on('close', handleClose);
            server.on('error', handleError);
            server.on('connection', handleConnection);
      }

      function handleOpen () {
            console.log('WebSocket Open');
      };

      function handleClose () {
            console.log('WebSocket Close');
      };

      function handleError () {
            console.log('WebSocket Error');
      };

      // 函数参数ws可以绑定message事件
      function handleConnection (ws) {
            console.log('WebSocket Connection');
            ws.on('message', handleMessage);
      }

      /*msg是客户端发送过来的消息。clients保存了连接到当前服务器的所有客户端。遍历每个客户端，通过
客户端的send()将所有的信息广播出去。
      */ 
      function handleMessage (msg) {
            console.log("msg", msg);
            server.clients.forEach((c) => {
                  c.send(msg);
            })
      }

      init();
})(WebSocket);