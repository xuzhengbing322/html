# 客户端
      实例化构造函数WebSocket，构造函数的参数是服务端地址。然后给实例对象ws添加事件，包括：open打开事
件、close关闭事件、error错误事件、message信息事件。客户端通过实例对象ws中的send方法给服务端发送信息，message事件的事件处理函数handleMessage接收客户端广播出来的消息。

# 服务端
      安装ws依赖包，从ws依赖包中引出WebSocket，然后实例化WebSocket中的构造函数Server，构造函数的参数
就是端口号。然后给实例对象server添加事件，包括：open打开事件、close关闭事件、error错误事件、connection监听事件。connection事件的事件回调函数handleConnection有参数ws。给参数ws添加message事件，事件处理函数是handleMessage。当客户端通过实例对象ws中的send()发送信息时，服务器的connection事件就会被触发，随后message事件就会被触发，事件处理函数handleMessage就能收到消息，即它的形参。
      实例对象server中clients包含所有连接到该服务器的客户端。在handleMessage事件回调函数中，遍历
server.clients中的所有客户端，然后将接收到的信息广播出去。这样其他的客户端就能接收到信息了。
      无论是客户端还是服务端，websocket都是建立在一个又一个的事件上去处理相应的问题。


# 业务开发的原则
      无论是视图还是逻辑，都是从外到里开发的流程。也就是做任何的东西首先要有架子，然后往架子里面填东西。

# 开发流程
1、开发Login组件。
      登陆组件加载完毕后，如果在Local Storage中保留username，就跳转到聊天页面。如果没有保留
username，就停留在登陆界面。此后，用户输入的username如果大于六位，就将username存储到Local Storage中，并跳转到聊天室。

2、开发Home组件。
      消息列表是数组，数组中包含很多对象，对象包含id、user、dateTime、msg属性。当点击发送时，获取msg
内容。如果msg非空，则构建一个基于msg的对象放入msgList。
msgList [
      {
            id: new Date().getTime(),
            user: username -> localStorage,
            dateTime: new Date().getTime(),
            msg: msg
      }
]

3、函数封装websocket逻辑。
      将websocket处理逻辑在一个js文件中封装成一个函数useWebsocket，以便home组件引入使用。实例化
WebSocket，并给实例对象ws绑定open\close\error\handlemessage事件。最后函数useWebsocket返回ws，以便home组件通过ws发送信息。
      home组件中执行函数useWebsocket，就会获取函数useWebsocket返回的ws，ws中绑定了各种事件。函数
useWebsocket执行完毕后，函数的变量对象AO被销毁，但是作用域依旧存在。因此ws的事件触发后，依旧可以调用useWebsocket中的事件处理函数。init()封装函数的执行过程，提高函数功能的模块化。将整个websocket处理逻辑封装成一个函数，提高程序的模块性。

4、发送和广播消息
      在home组件中发送消息，后端在handleMessage事件回调函数的形参msg接受消息。msg是字符串，需要转化为
JSON数据。