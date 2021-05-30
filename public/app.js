const config = {
    // secret
  };

firebase.initializeApp(config);

const point = document.getElementById('point');

let draggable = false;

const setCoords = (el, x, y) => {
    el.style.left = x + 'px';
    el.style.top = y + 'px';
};

document.addEventListener('mousedown', event => {
    if (event.target.id === 'point') {
        draggable = true;
    }
});

document.addEventListener('mouseup', event => {
    draggable = false;
});

const db = firebase.database();

document.addEventListener('mousemove', event => {
    if (draggable) {
        setCoords(point, event.clientX, event.clientY);
        db.ref('coords').set({
            x: event.clientX,
            y: event.clientY
        });
    }
});

db.ref('coords').on('value', snap => {
    if (!draggable) {
        let value = snap.val();
        setCoords(point, value.x, value.y);
    }
});
