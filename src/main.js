const $siteList=$('.siteList')
const $last=$siteList.find('li.last')//易错，注意查找范围是li！
const x=localStorage.getItem('x')
const xObject=JSON.parse(x)//parse把字符串重新变成对象

const hashMap=xObject || [
    {logo:'A',url:'https://www.acfun.cn'},
    {
        logo:'B',
        url:'https://www.bilibili.com/'}
]

const simplifyUrl=(url)=>{
return url.replace('https://','')
.replace('http://','')
.replace('www.','')
.replace(/\/.*/,'')//删除 / 开头的内容
}
const render=()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        console.log(index)
        const $li=$(`
                <li>
                  
                        <div class="site">
                            <div class="logo">${node.logo}</div>
                            <div class="link">${simplifyUrl(node.url)}</div>
                            <div class="close">
                            <svg class="icon">
                            <use xlink:href="#icon-close"></use>
                            </svg>
                            </div>
                            </div>
               
                </li>
        `).insertBefore($last)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            console.log('这里')
            e.stopPropagation()//阻止冒泡
            console.log(hashMap)
            hashMap.splice(index,1)
            render()
        })
    })
}

render()
$('.addButton').on(
    'click',()=>{
       let url=window.prompt('请问你要添加的网址是啥？')
if(url.indexOf('http') != 0){
    url='https://'+url
}
console.log(url)
hashMap.push({
    logo:simplifyUrl(url)[0],
    logoType:'text',
    url:url
});

render()
    });

    window.onbeforeunload=()=>{
       // console.log('页面要关闭了！')
        const string=JSON.stringify(hashMap)//stringify把对象变成字符串
        //console.log(typeof hashMap)
        //console.log(hashMap)
        //console.log(typeof string)
        //console.log(string)
localStorage.setItem('x',string)
    }

    //document.addEventListener()
$(document).on('keypress',(e)=>{
   // console.log(e.key)
   const{key}=e
   for(let i=0;i<hashMap.length;i++){
       if(hashMap[i].logo.toLowerCase()===key){
           window.open(hashMap[i].url)
       }
   }
})