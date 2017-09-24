export interface Programe {
  id: string;   //排序号
  guid: string; //唯一号
  name: string; //标题
  shortContent: string; //文本简介
  content: string[]; //文本内容,可以多段分割
  contentType: string, //"video" or "audio"
  image: string, //资源封面图路径
  url: string, //资源路径
  date: Date; //显示时间
  playedTimes?: number; //被播放次数
  likedTimes?: number; //被喜爱次数
}

export interface TVPrograme extends Programe {

}

export interface RadioPrograme extends Programe {

}
