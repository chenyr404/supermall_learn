import Backtop from "components/content/backtop/Backtop";

export const itemListenerMixin = {
  mounted(){

  }
}
export const BackTop = {
  components:{
    Backtop
  },
  data(){
    return {
      isShowBackUp:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.getscrollTo(0,0)
    },
    ListerShowBackTop(position){
      if(-position.y > 1000){
        this.isShowBackUp = true
      }else {
        this.isShowBackUp = false
      }
    }
  }
}
