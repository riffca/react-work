import SockJS from "sockjs-client/dist/sockjs.min"
// import store from "root/store"

let token = localStorage.getItem("token") || "default" 
let host = "http://localhost:8092"

class Chan {

  constructor() {

    this.connected=false
    this.listenBox={}
    this.onceBox={}

    //SCHEMA
    this.payload = {}
    this.action = "default"
    this.token = token

    this.init()

  }
  on(action,cb, isOneAction=false){
    if(isOneAction){
      this.onceBox[action] = cb
      return
    }
    this.listenBox[action] = cb
  }
  service(action,data,cb){

    if(!this.connected){
      setTimeout(()=>{
        this.service(action,data,cb)
      },500)
      return
    }

    this.action = action
    this.payload = data

    if(cb)this.on(action, cb, true)

    let schema = {
      action: this.action,
      payload: this.payload,
      token: this.token
    }

    this.sock.send(JSON.stringify(schema))

    console.log("%c-----> " + action,"font-size:1.4rem;color:darkgreen")
    //console.log(schema)
    console.log("%cPAYLOAD: ","font-size:1.2rem;color:darkgreen")
    console.log(schema.payload)

  }
  init(){
    var self = this
    self.sock = new SockJS(host+'/echo')

    self.sock.onopen = function() {
      self.connected = true
      //store.dispatch("checkAuth")
    };

    self.sock.onmessage = function(e) {
      try {
        var data = JSON.parse(e.data);
        self.logResponse(data)
        self.exec(data)
      } catch ( e ) {
      }

    };

    self.sock.onclose = function() {
      self.connected=false
      setTimeout(()=>{
        self.init()
      },1000)
    };
    
  }
  req(action, data={}){
    return new Promise((resolve,reject)=>{
      this.service(action,data,res=>{
        resolve(res.payload)
      })
    })
  }

  exec(data){

    let listen = this.listenBox
    let once = this.onceBox
    let action = data.action
    if(listen.hasOwnProperty(action)){
      listen[action](data)
    }
    if(once.hasOwnProperty(action)){
      if(once[action] != null){
        once[action](data)        
        once[action]=null
      }
    }
  }

  logResponse(data){
    console.log("%c<--- " + data.action,"font-size:1.4rem;color:darkblue")
    //console.log(JSON.parse(JSON.stringify(data)))
    console.log("%cPAYLOAD: ","font-size:1.2rem;color:darkblue")
    console.log(JSON.parse(JSON.stringify(data.payload)))
  }
}

export default new Chan()