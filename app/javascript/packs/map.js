(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
  key: process.env.Maps_API_Key,
  v: "weekly",
  // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
  // Add other bootstrap parameters as needed, using camel case.
});

let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        center: { lat: 35.681236, lng: 139.767125 },
        zoom: 15,
        mapId: "DEMO_MAP_ID",
        mapTypeControl: false
    });

    // デモ用のマーカー
    new google.maps.Marker({
      position: { lat: 35.681236, lng: 139.767125 },
      map,
      title: "Hello World!",
    });

    try {
      const response = await fetch("/post_images.json");
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      console.log(data);
  
      data.forEach(item => {
        console.log(item); 
        
        const latitude = item.latitude;
        const longitude = item.longitude;
        const shopName = item.shop_name;
        const userImage = item.user;
        const userName = item.user;
        const postImage = item.image;
        const address = item.address;
        const caption = item.caption;

        
        // マーカーの作成
        const marker = new AdvancedMarkerElement({
          position: { lat: latitude, lng: longitude },
          map,
          title: shopName,
      });

        // 情報ウィンドウの内容
        const contentString = `
          <div class="information container p-0">
            <div class="mb-3 d-flex align-items-center">
              <img class="rounded-circle mr-2" src="${userImage}" width="40" height="40">
              <p class="lead m-0 font-weight-bold">${userName}</p>
            </div>
            <div class="mb-3">
              <img class="thumbnail" src="${postImage}" loading="lazy">
            </div>
            <div>
              <h1 class="h4 font-weight-bold">${shopName}</h1>
              <p class="text-muted">${address}</p>
              <p class="lead">${caption}</p>
            </div>
          </div>
        `;
        
        // 情報ウィンドウの作成
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
          ariaLabel: shopName,
        });

        // マーカークリック時に情報ウィンドウを表示
        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
      });
    } catch (error) {
      console.error('Error fetching or processing post images:', error);
    }
}

initMap();