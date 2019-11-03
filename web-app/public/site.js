/* eslint-disable  */
(function($, axios) {
  // Form page
  if (document.getElementById('form')) {
    // body
    const form = document.getElementById('form');
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const photos = document.getElementById('photos').files[0];
      const formData = new FormData();
      formData.append('email', form.email.value);
      formData.append('phone', form.phone.value);
      formData.append('photos', photos);

      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

      axios({
        method: 'post',
        url: '/api',
        data: formData
      })
        .then(function(res) {
          window.location.href = '/gallery';
        })
        .catch(function(e) {
          console.log(e);
        });
    });
  }

  // Gallery Page
  if (document.getElementById('gallery-page')) {
    baguetteBox.run('.tz-gallery');

    axios({
      method: 'get',
      url: '/api'
    })
      .then(function(res) {
        const nodeArray = [];
        const { users: data } = res.data;

        if (data.length === 0) {
          const pTag = document.createElement('p');
          pTag.setAttribute('id', 'noPics');
          const aTag = document.createElement('a');
          aTag.setAttribute('href', '/');
          const text = document.createTextNode('Add pictures here');
          aTag.appendChild(text);

          pTag.appendChild(aTag);
          document.getElementById('tz-gallery-row').appendChild(pTag);
        } else {
          // If data
          if (document.getElementById('noPics')) {
            document
              .getElementById('tz-gallery-row')
              .removeChild(document.getElementById('noPics'));
          }
          data.forEach(entry => {
            // First image
            const divTag1 = document.createElement('div');
            divTag1.classList.add('col-sm-6');
            const aTag1 = document.createElement('a');
            aTag1.classList.add('lightbox');
            aTag1.setAttribute('href', entry.s3rawurl);
            const img1 = document.createElement('img');
            img1.setAttribute('src', entry.s3rawurl);
            img1.setAttribute('alt', `Raw: ${entry.filename}`);

            aTag1.appendChild(img1);
            divTag1.appendChild(aTag1);

            // Second image
            const divTag2 = document.createElement('div');
            divTag2.classList.add('col-sm-6');
            const aTag2 = document.createElement('a');
            aTag2.classList.add('lightbox');
            aTag2.setAttribute('href', entry.s3rawurl);
            const img2 = document.createElement('img');
            img2.setAttribute('src', entry.s3finishedurl);
            img2.setAttribute('alt', `Black and White: ${entry.filename}`);

            aTag2.appendChild(img2);
            divTag2.appendChild(aTag2);

            nodeArray.push(divTag1);
            nodeArray.push(divTag2);
          });

          document.getElementById('tz-gallery-row').append(...nodeArray);
        }
      })
      .catch(function(e) {
        console.log(e);
      });
  }
})(jQuery, axios);
