<template>
  <transition name="fade">
    <div class="container" v-if="ready">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Send File</div>

                    <div class="panel-body">
                        Your channel ID is {{peer.id}}
                        <input class="form-control" v-model="remote_channel_id" placeholder="Remote Channel ID">
                        <input    v-on:change="updateFile($event)" type="file"> <button class="btn btn-default" v-on:click="uploadFile">Send File</button>
                        {{file}}
                    </div>
                </div>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        data() {
          return {
            peer: {},
            conn : {},
            file: {},
            remote_channel_id: '',
            file: {},
            ready: false
          }
        },
        methods: {
          updateFile: function(event){
            this.file = event.target.files[0];
          },
          uploadFile: function(event){
            this.conn = this.peer.connect(this.remote_channel_id);
            this.conn.on('open', function(){
              conn.send('hi!');
            });
            var file = this.file;
            var blob = new Blob(event.target.files, {type: file.type});

            this.conn.send({
                file: blob,
                filename: file.name,
                filetype: file.type
            });


          },
          downloadFile: function(data){
            var blob = new Blob([data.file], {type: data.filetype});
            this.file = URL.createObjectURL(blob);
          }
        },
        created(){
          this.peer = new Peer({host:'fileshare.jyroneparker.com',port:9000});
          this.ready = true;
          this.peer.on('connection', function(conn) {
          this.conn.on('data', this.downloadFile());
        });
        }
    }
</script>
