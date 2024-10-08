document.addEventListener('DOMContentLoaded', () => {
  const channelList = document.getElementById('channelList');
  const channelListItems = document.getElementById('channelListItems');
  const video = document.getElementById('video');
  const player = new shaka.Player(video);
  const container = document.querySelector('.container'); 
  async function loadChannels() {
    try {
      const response = await fetch('getChannels.php');
      const channels = await response.json();
      if (channels.error) {
        console.error(channels.error);
        channelList.style.display = 'none'; 
        return;
      }
      channelListItems.innerHTML = ''; 
      if (channels.length === 0) {
        channelList.style.display = 'none'; 
        return;
      }
      channelList.style.display = 'block'; 
      channels.forEach((channel, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${channel.logo}" alt="${channel.title}"><span>${channel.title}</span>`;
        li.addEventListener('click', () => {
          
          const allLiItems = document.querySelectorAll('.channel-list li');
          allLiItems.forEach(item => item.style.backgroundColor = '');
          // تغيير خلفية العنصر المحدد
          li.style.backgroundColor = '#2273ff4d';
          // إعداد مشغل الفيديو وتشغيل القناة بدون DRM
          player.load(channel.url).then(() => {
            console.log('The video has been loaded successfully!');
            channelList.style.display = 'none'; 
          }).catch(error => {
            console.error('Error loading video:', error);
          });
        });
        channelListItems.appendChild(li);
        // تشغيل القناة الأولى تلقائيًا
        if (index === 0) {
          li.style.backgroundColor = '#2273ff4d'; 
          player.load(channel.url).then(() => {
            console.log('The default video has been loaded successfully!');
            channelList.style.display = 'none'; 
          }).catch(error => {
            console.error('Error loading default video:', error);
          });
        }
      });
      
      video.addEventListener('click', () => {
        if (channels.length > 0) {
          channelList.style.display = channelList.style.display === 'none' ? 'block' : 'none';
        }
      });
     
      setTimeout(() => {
        channelList.style.display = 'none';
      }, 15000); 
    } catch (error) {
      console.error('Error fetching channels:', error);
      channelList.style.display = 'none'; 
    }
  }
  // Function to play video from input fields
  function playVideoFromInputs() {
    const manifestUri = document.getElementById('manifestUri').value;
    player.load(manifestUri).then(() => {
      console.log('The video has been loaded successfully!');
    }).catch(error => {
      console.error('Error loading video:', error);
    });
  }
  // Function to play m3u from input field and redirect to addLink.php
  function playM3uFromInput() {
    const m3uLink = document.getElementById('m3u').value;
    const url = `addLink.php?id=${encodeURIComponent(m3uLink)}`;
    // Redirect to addLink.php with the m3u link as a parameter
    window.location.href = url;
  }
  // Add event listener for the Play Video button
  document.getElementById('playButton').addEventListener('click', () => {
    playVideoFromInputs();
  });
  // Add event listener for the Play m3u button
  document.getElementById('playM3u').addEventListener('click', () => {
    playM3uFromInput();
  });
  // Load channels on page load
  loadChannels();
  container.addEventListener('click', () => {
    if (channelListItems.children.length > 0) {
      channelList.style.display = 'block'; 
      setTimeout(() => {
        channelList.style.display = 'none'; 
      }, 15000); // الإخفاء بعد 15 ثانية
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const alertMessage = document.getElementById('alertMessage');
  // Check for iOS devices
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    alertMessage.style.display = 'flex'; // Show alert message
  }
});
if (window.location.hostname !== 'player-drm.vercel.app') {
  setTimeout(function() {
    window.location.href = 'https://player-drm.vercel.app';
  }, 15000);
}
 //debogger
 (function b() {
    try {
        (function f(e) {
            if (1 !== ("" + e / e).length || 0 === e)
                (function(){}).constructor("debugger")();
            else 
                debugger;
            f(++e);
        })(0);
    } catch(d) {
        setTimeout(b, 250);
    }
})();
