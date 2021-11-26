/*
playlistid = "PLGzNH5a9hxjZq5ick2B6ns6t8xLpS5-LF"

key = "AIzaSyAzmrdyn7aRmI1m18va9_agD7NE9--3Rkc"


'https://www.googleapis.com/youtube/v3/playlistItems';

호출시 옵션값
part: 'snippet',
key: 키값
maxResults: 호출할 데이터 갯수,
playlistId: 호출할 유튜브 재생목록 아이디

*/
class Youtube{
    constructor(selector, opt){
        this.main = document.querySelector(selector);
        this.key = opt.Api_key;
        this.playListId = opt.playlistId;
        this.num = opt.num;
        this.url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${this.key}&playlistId=${this.playListId}&maxResults=${this.num}`;

        //로딩시 동적으로 유튜브 리스트 생성
        this.createList(this.url);

        //팝업 생성 이벤트 위임
        this.main.addEventListener("click", e=>{
            this.createPop(e);
        });


        //팝업 닫기 버튼 클릭시
        this.main.addEventListener("click", e=>{
            this.removePop(e);
        });
    }
    
    createList(url){
        fetch(url)
        .then(data=>{
        return data.json();
        })
        .then(json =>{
        console.log(json.items);
    
        let items = json.items;
    
        let result = "";
    
        items.forEach(item =>{
            result += `
                    <article>
                        <a href="${item.snippet.resourceId.videoId}">
                        <img src="${item.snippet.thumbnails.medium.url}">
                        </a>
                        <h2>${item.snippet.title}</h2>
                        <p>${item.snippet.publishedAt}</p>
                    </article>
                    `
        });
    
        this.main.innerHTML = result;
        });
    }
    
    createPop(e){
        e.preventDefault();
        if(e.target.parentNode.nodeName !="A") return;
    
        const vidId = e.target.closest("a").getAttribute("href");
    
        let pop = document.createElement("figure");
        pop.innerHTML = `<iframe src= "https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
        <span class="btnClose">close</span>`;
        //width="560" height="315"- 기본사이즈
    
        this.main.appendChild(pop);
    }
    
    removePop(e){
        const pop = this.main.querySelector("figure");
        if(pop != null){
            const close = pop.querySelector("span");
    
            if(e.target == close){
                e.target.closest("figure").remove();
            }
        }
    }
}

