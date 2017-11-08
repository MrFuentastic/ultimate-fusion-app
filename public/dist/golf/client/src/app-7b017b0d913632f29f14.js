!function(n){function t(I){if(g[I])return g[I].exports;var c=g[I]={i:I,l:!1,exports:{}};return n[I].call(c.exports,c,c.exports,t),c.l=!0,c.exports}var g={};t.m=n,t.c=g,t.d=function(n,g,I){t.o(n,g)||Object.defineProperty(n,g,{configurable:!1,enumerable:!0,get:I})},t.n=function(n){var g=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(g,"a",g),g},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="/dist/",t(t.s=247)}({247:/*!***********************************************!*\
  !*** ./app/javascript/golf/client/src/app.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
function(module,exports,__webpack_require__){"use strict";eval("\n\n/* eslint-disable */\n\n(function () {\n  'use strict';\n\n  var socket = io.connect();\n\n  swip.init({ socket: socket, container: document.getElementById('root') }, function (client) {\n    var converter = client.converter;\n    var stage = client.stage;\n    var ctx = stage.getContext('2d');\n\n    var state = null;\n    var dragPosition = null;\n    var dragging = false;\n\n    client.onClick(function (evt) {\n      var hole = { x: evt.position.x, y: evt.position.y };\n      client.emit('setHole', hole);\n    });\n\n    client.onDragStart(function (evt) {\n      if (state) {\n        var distanceX = evt.position[0].x - state.cluster.data.ball.x;\n        var distanceY = evt.position[0].y - state.cluster.data.ball.y;\n        var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));\n\n        if (distance < 2 * state.cluster.data.ball.radius) {\n          dragging = true;\n          dragPosition = evt.position[0];\n        }\n      }\n    });\n\n    client.onDragMove(function (evt) {\n      var distanceX = evt.position[0].x - state.cluster.data.ball.x;\n      var distanceY = evt.position[0].y - state.cluster.data.ball.y;\n      var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));\n\n      if (dragging) {\n        if (distance > 150) {\n          dragPosition = {\n            x: state.cluster.data.ball.x + distanceX / distance * 150,\n            y: state.cluster.data.ball.y + distanceY / distance * 150\n          };\n        } else {\n          dragPosition = evt.position[0];\n        }\n      }\n    });\n\n    client.onDragEnd(function (evt) {\n      if (dragging) {\n        dragging = false;\n        client.emit('hitBall', {\n          speedX: (evt.position[0].x - state.cluster.data.ball.x) / 2,\n          speedY: (evt.position[0].y - state.cluster.data.ball.y) / 2\n        });\n      }\n    });\n\n    swip.sensor.onChangeOrientation(throttle(function (evt) {\n      client.emit('updateOrientation', {\n        rotationX: evt.rotation.x,\n        rotationY: evt.rotation.y\n      });\n    }, 200));\n\n    client.onUpdate(function (evt) {\n      state = evt;\n      var client = state.client;\n      var ball = state.cluster.data.ball;\n      var hole = state.cluster.data.hole;\n\n      ctx.save();\n\n      applyTransform(ctx, converter, client.transform);\n      drawBackground(ctx, client);\n      drawHole(ctx, hole);\n\n      if (dragging) {\n        drawArrow(ctx, ball, dragPosition);\n      }\n\n      drawBall(ctx, ball);\n      drawWalls(ctx, client);\n\n      ctx.restore();\n    });\n  });\n\n  function applyTransform(ctx, converter, transform) {\n    ctx.translate(-converter.toDevicePixel(transform.x), -converter.toDevicePixel(transform.y));\n    ctx.scale(converter.toDevicePixel(1), converter.toDevicePixel(1));\n  }\n\n  function drawBackground(ctx, client) {\n    ctx.save();\n    ctx.fillStyle = '#80d735';\n    ctx.fillRect(client.transform.x, client.transform.y, client.size.width, client.size.height);\n    ctx.restore();\n  }\n\n  function drawWalls(ctx, client) {\n    var openings = client.openings;\n    var transformX = client.transform.x;\n    var transformY = client.transform.y;\n    var width = client.size.width;\n    var height = client.size.height;\n\n    ctx.save();\n    ctx.lineWidth = 40;\n    ctx.shadowColor = '#dba863';\n    ctx.shadowBlur = 10;\n\n    ctx.strokeStyle = '#ffde99';\n\n    // left\n    ctx.beginPath();\n    ctx.moveTo(transformX, transformY);\n\n    openings.left.sort(openingSort).forEach(function (opening) {\n      ctx.lineTo(transformX, opening.start + transformY);\n      ctx.stroke();\n      ctx.beginPath();\n      ctx.moveTo(transformX, opening.end + transformY);\n    });\n\n    ctx.lineTo(transformX, height + transformY);\n    ctx.stroke();\n\n    // right\n    ctx.beginPath();\n    ctx.moveTo(width + transformX, transformY);\n\n    openings.right.sort(openingSort).forEach(function (opening) {\n      ctx.lineTo(width + transformX, opening.start + transformY);\n      ctx.stroke();\n      ctx.beginPath();\n      ctx.moveTo(width + transformX, opening.end + transformY);\n    });\n\n    ctx.lineTo(width + transformX, height + transformY);\n    ctx.stroke();\n\n    // top\n    ctx.beginPath();\n    ctx.moveTo(transformX, transformY);\n\n    openings.top.sort(openingSort).forEach(function (opening) {\n      ctx.lineTo(opening.start + transformX, transformY);\n      ctx.stroke();\n      ctx.beginPath();\n      ctx.moveTo(opening.end + transformX, transformY);\n    });\n\n    ctx.lineTo(width + transformX, transformY);\n    ctx.stroke();\n\n    // bottom\n    ctx.beginPath();\n    ctx.moveTo(transformX, height + transformY);\n\n    openings.bottom.sort(openingSort).forEach(function (opening) {\n      ctx.lineTo(opening.start + transformX, height + transformY);\n      ctx.stroke();\n      ctx.beginPath();\n      ctx.moveTo(opening.end + transformX, height + transformY);\n    });\n\n    ctx.lineTo(width + transformX, height + transformY);\n    ctx.stroke();\n    ctx.restore();\n  }\n\n  function openingSort(openingA, openingB) {\n    return openingB.start - openingA.start;\n  }\n\n  function drawBall(ctx, ball) {\n    ctx.save();\n\n    ctx.fillStyle = '#fff';\n    ctx.shadowBlur = 10;\n    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';\n\n    ctx.beginPath();\n    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);\n    ctx.fill();\n\n    ctx.restore();\n  }\n\n  function drawArrow(ctx, ball, dragPosition) {\n    var angle;\n\n    ctx.save();\n\n    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';\n    ctx.lineWidth = 3;\n    ctx.shadowBlur = 5;\n\n    angle = -Math.atan2(dragPosition.x - ball.x, dragPosition.y - ball.y) + Math.PI / 2;\n\n    ctx.beginPath();\n    ctx.arc(ball.x, ball.y, ball.radius * 2, angle + Math.PI / 2, angle - Math.PI / 2);\n    ctx.arc(dragPosition.x, dragPosition.y, ball.radius, angle - Math.PI / 2, angle + Math.PI / 2);\n    ctx.fill();\n\n    ctx.restore();\n  }\n\n  function drawHole(ctx, hole) {\n    ctx.save();\n\n    ctx.fillStyle = 'black';\n    ctx.strokeStyle = '#4b7f1f';\n    ctx.lineWidth = 2;\n\n    ctx.beginPath();\n    ctx.arc(hole.x, hole.y, hole.radius, 0, 2 * Math.PI);\n    ctx.fill();\n    ctx.stroke();\n\n    ctx.restore();\n  }\n\n  function throttle(fn, threshhold, scope) {\n    threshhold || (threshhold = 250);\n    var last, deferTimer;\n    return function () {\n      var context = scope || this;\n\n      var now = +new Date(),\n          args = arguments;\n      if (last && now < last + threshhold) {\n        // hold on to it\n        clearTimeout(deferTimer);\n        deferTimer = setTimeout(function () {\n          last = now;\n          fn.apply(context, args);\n        }, threshhold);\n      } else {\n        last = now;\n        fn.apply(context, args);\n      }\n    };\n  }\n})();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjQ3LmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXBwL2phdmFzY3JpcHQvZ29sZi9jbGllbnQvc3JjL2FwcC5qcz8zMjdmIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50LWRpc2FibGUgKi9cblxuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBzb2NrZXQgPSBpby5jb25uZWN0KCk7XG5cbiAgc3dpcC5pbml0KHsgc29ja2V0OiBzb2NrZXQsIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSB9LCBmdW5jdGlvbiAoY2xpZW50KSB7XG4gICAgdmFyIGNvbnZlcnRlciA9IGNsaWVudC5jb252ZXJ0ZXI7XG4gICAgdmFyIHN0YWdlID0gY2xpZW50LnN0YWdlO1xuICAgIHZhciBjdHggPSBzdGFnZS5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgdmFyIHN0YXRlID0gbnVsbDtcbiAgICB2YXIgZHJhZ1Bvc2l0aW9uID0gbnVsbDtcbiAgICB2YXIgZHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgIGNsaWVudC5vbkNsaWNrKGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIHZhciBob2xlID0geyB4OiBldnQucG9zaXRpb24ueCwgeTogZXZ0LnBvc2l0aW9uLnkgfTtcbiAgICAgIGNsaWVudC5lbWl0KCdzZXRIb2xlJywgaG9sZSk7XG4gICAgfSk7XG5cbiAgICBjbGllbnQub25EcmFnU3RhcnQoZnVuY3Rpb24gKGV2dCkge1xuICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgIHZhciBkaXN0YW5jZVggPSBldnQucG9zaXRpb25bMF0ueCAtIHN0YXRlLmNsdXN0ZXIuZGF0YS5iYWxsLng7XG4gICAgICAgIHZhciBkaXN0YW5jZVkgPSBldnQucG9zaXRpb25bMF0ueSAtIHN0YXRlLmNsdXN0ZXIuZGF0YS5iYWxsLnk7XG4gICAgICAgIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyhkaXN0YW5jZVgsIDIpICsgTWF0aC5wb3coZGlzdGFuY2VZLCAyKSk7XG5cbiAgICAgICAgaWYgKGRpc3RhbmNlIDwgMiAqIHN0YXRlLmNsdXN0ZXIuZGF0YS5iYWxsLnJhZGl1cykge1xuICAgICAgICAgIGRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICBkcmFnUG9zaXRpb24gPSBldnQucG9zaXRpb25bMF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNsaWVudC5vbkRyYWdNb3ZlKGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIHZhciBkaXN0YW5jZVggPSBldnQucG9zaXRpb25bMF0ueCAtIHN0YXRlLmNsdXN0ZXIuZGF0YS5iYWxsLng7XG4gICAgICB2YXIgZGlzdGFuY2VZID0gZXZ0LnBvc2l0aW9uWzBdLnkgLSBzdGF0ZS5jbHVzdGVyLmRhdGEuYmFsbC55O1xuICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KGRpc3RhbmNlWCwgMikgKyBNYXRoLnBvdyhkaXN0YW5jZVksIDIpKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDE1MCkge1xuICAgICAgICAgIGRyYWdQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgIHg6IHN0YXRlLmNsdXN0ZXIuZGF0YS5iYWxsLnggKyBkaXN0YW5jZVggLyBkaXN0YW5jZSAqIDE1MCxcbiAgICAgICAgICAgIHk6IHN0YXRlLmNsdXN0ZXIuZGF0YS5iYWxsLnkgKyBkaXN0YW5jZVkgLyBkaXN0YW5jZSAqIDE1MFxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHJhZ1Bvc2l0aW9uID0gZXZ0LnBvc2l0aW9uWzBdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjbGllbnQub25EcmFnRW5kKGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICBkcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICBjbGllbnQuZW1pdCgnaGl0QmFsbCcsIHtcbiAgICAgICAgICBzcGVlZFg6IChldnQucG9zaXRpb25bMF0ueCAtIHN0YXRlLmNsdXN0ZXIuZGF0YS5iYWxsLngpIC8gMixcbiAgICAgICAgICBzcGVlZFk6IChldnQucG9zaXRpb25bMF0ueSAtIHN0YXRlLmNsdXN0ZXIuZGF0YS5iYWxsLnkpIC8gMlxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHN3aXAuc2Vuc29yLm9uQ2hhbmdlT3JpZW50YXRpb24odGhyb3R0bGUoZnVuY3Rpb24gKGV2dCkge1xuICAgICAgY2xpZW50LmVtaXQoJ3VwZGF0ZU9yaWVudGF0aW9uJywge1xuICAgICAgICByb3RhdGlvblg6IGV2dC5yb3RhdGlvbi54LFxuICAgICAgICByb3RhdGlvblk6IGV2dC5yb3RhdGlvbi55XG4gICAgICB9KTtcbiAgICB9LCAyMDApKTtcblxuICAgIGNsaWVudC5vblVwZGF0ZShmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBzdGF0ZSA9IGV2dDtcbiAgICAgIHZhciBjbGllbnQgPSBzdGF0ZS5jbGllbnQ7XG4gICAgICB2YXIgYmFsbCA9IHN0YXRlLmNsdXN0ZXIuZGF0YS5iYWxsO1xuICAgICAgdmFyIGhvbGUgPSBzdGF0ZS5jbHVzdGVyLmRhdGEuaG9sZTtcblxuICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgYXBwbHlUcmFuc2Zvcm0oY3R4LCBjb252ZXJ0ZXIsIGNsaWVudC50cmFuc2Zvcm0pO1xuICAgICAgZHJhd0JhY2tncm91bmQoY3R4LCBjbGllbnQpO1xuICAgICAgZHJhd0hvbGUoY3R4LCBob2xlKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIGRyYXdBcnJvdyhjdHgsIGJhbGwsIGRyYWdQb3NpdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGRyYXdCYWxsKGN0eCwgYmFsbCk7XG4gICAgICBkcmF3V2FsbHMoY3R4LCBjbGllbnQpO1xuXG4gICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH0pO1xuICB9KTtcblxuICBmdW5jdGlvbiBhcHBseVRyYW5zZm9ybShjdHgsIGNvbnZlcnRlciwgdHJhbnNmb3JtKSB7XG4gICAgY3R4LnRyYW5zbGF0ZSgtY29udmVydGVyLnRvRGV2aWNlUGl4ZWwodHJhbnNmb3JtLngpLCAtY29udmVydGVyLnRvRGV2aWNlUGl4ZWwodHJhbnNmb3JtLnkpKTtcbiAgICBjdHguc2NhbGUoY29udmVydGVyLnRvRGV2aWNlUGl4ZWwoMSksIGNvbnZlcnRlci50b0RldmljZVBpeGVsKDEpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdCYWNrZ3JvdW5kKGN0eCwgY2xpZW50KSB7XG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJyM4MGQ3MzUnO1xuICAgIGN0eC5maWxsUmVjdChjbGllbnQudHJhbnNmb3JtLngsIGNsaWVudC50cmFuc2Zvcm0ueSwgY2xpZW50LnNpemUud2lkdGgsIGNsaWVudC5zaXplLmhlaWdodCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdXYWxscyhjdHgsIGNsaWVudCkge1xuICAgIHZhciBvcGVuaW5ncyA9IGNsaWVudC5vcGVuaW5ncztcbiAgICB2YXIgdHJhbnNmb3JtWCA9IGNsaWVudC50cmFuc2Zvcm0ueDtcbiAgICB2YXIgdHJhbnNmb3JtWSA9IGNsaWVudC50cmFuc2Zvcm0ueTtcbiAgICB2YXIgd2lkdGggPSBjbGllbnQuc2l6ZS53aWR0aDtcbiAgICB2YXIgaGVpZ2h0ID0gY2xpZW50LnNpemUuaGVpZ2h0O1xuXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHgubGluZVdpZHRoID0gNDA7XG4gICAgY3R4LnNoYWRvd0NvbG9yID0gJyNkYmE4NjMnO1xuICAgIGN0eC5zaGFkb3dCbHVyID0gMTA7XG5cbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2ZmZGU5OSc7XG5cbiAgICAvLyBsZWZ0XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8odHJhbnNmb3JtWCwgdHJhbnNmb3JtWSk7XG5cbiAgICBvcGVuaW5ncy5sZWZ0LnNvcnQob3BlbmluZ1NvcnQpLmZvckVhY2goZnVuY3Rpb24gKG9wZW5pbmcpIHtcbiAgICAgIGN0eC5saW5lVG8odHJhbnNmb3JtWCwgb3BlbmluZy5zdGFydCArIHRyYW5zZm9ybVkpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyh0cmFuc2Zvcm1YLCBvcGVuaW5nLmVuZCArIHRyYW5zZm9ybVkpO1xuICAgIH0pO1xuXG4gICAgY3R4LmxpbmVUbyh0cmFuc2Zvcm1YLCBoZWlnaHQgKyB0cmFuc2Zvcm1ZKTtcbiAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAvLyByaWdodFxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHdpZHRoICsgdHJhbnNmb3JtWCwgdHJhbnNmb3JtWSk7XG5cbiAgICBvcGVuaW5ncy5yaWdodC5zb3J0KG9wZW5pbmdTb3J0KS5mb3JFYWNoKGZ1bmN0aW9uIChvcGVuaW5nKSB7XG4gICAgICBjdHgubGluZVRvKHdpZHRoICsgdHJhbnNmb3JtWCwgb3BlbmluZy5zdGFydCArIHRyYW5zZm9ybVkpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyh3aWR0aCArIHRyYW5zZm9ybVgsIG9wZW5pbmcuZW5kICsgdHJhbnNmb3JtWSk7XG4gICAgfSk7XG5cbiAgICBjdHgubGluZVRvKHdpZHRoICsgdHJhbnNmb3JtWCwgaGVpZ2h0ICsgdHJhbnNmb3JtWSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgLy8gdG9wXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8odHJhbnNmb3JtWCwgdHJhbnNmb3JtWSk7XG5cbiAgICBvcGVuaW5ncy50b3Auc29ydChvcGVuaW5nU29ydCkuZm9yRWFjaChmdW5jdGlvbiAob3BlbmluZykge1xuICAgICAgY3R4LmxpbmVUbyhvcGVuaW5nLnN0YXJ0ICsgdHJhbnNmb3JtWCwgdHJhbnNmb3JtWSk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKG9wZW5pbmcuZW5kICsgdHJhbnNmb3JtWCwgdHJhbnNmb3JtWSk7XG4gICAgfSk7XG5cbiAgICBjdHgubGluZVRvKHdpZHRoICsgdHJhbnNmb3JtWCwgdHJhbnNmb3JtWSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgLy8gYm90dG9tXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8odHJhbnNmb3JtWCwgaGVpZ2h0ICsgdHJhbnNmb3JtWSk7XG5cbiAgICBvcGVuaW5ncy5ib3R0b20uc29ydChvcGVuaW5nU29ydCkuZm9yRWFjaChmdW5jdGlvbiAob3BlbmluZykge1xuICAgICAgY3R4LmxpbmVUbyhvcGVuaW5nLnN0YXJ0ICsgdHJhbnNmb3JtWCwgaGVpZ2h0ICsgdHJhbnNmb3JtWSk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKG9wZW5pbmcuZW5kICsgdHJhbnNmb3JtWCwgaGVpZ2h0ICsgdHJhbnNmb3JtWSk7XG4gICAgfSk7XG5cbiAgICBjdHgubGluZVRvKHdpZHRoICsgdHJhbnNmb3JtWCwgaGVpZ2h0ICsgdHJhbnNmb3JtWSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuaW5nU29ydChvcGVuaW5nQSwgb3BlbmluZ0IpIHtcbiAgICByZXR1cm4gb3BlbmluZ0Iuc3RhcnQgLSBvcGVuaW5nQS5zdGFydDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdCYWxsKGN0eCwgYmFsbCkge1xuICAgIGN0eC5zYXZlKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnO1xuICAgIGN0eC5zaGFkb3dCbHVyID0gMTA7XG4gICAgY3R4LnNoYWRvd0NvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4yKSc7XG5cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhiYWxsLngsIGJhbGwueSwgYmFsbC5yYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdBcnJvdyhjdHgsIGJhbGwsIGRyYWdQb3NpdGlvbikge1xuICAgIHZhciBhbmdsZTtcblxuICAgIGN0eC5zYXZlKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC41KSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDM7XG4gICAgY3R4LnNoYWRvd0JsdXIgPSA1O1xuXG4gICAgYW5nbGUgPSAtTWF0aC5hdGFuMihkcmFnUG9zaXRpb24ueCAtIGJhbGwueCwgZHJhZ1Bvc2l0aW9uLnkgLSBiYWxsLnkpICsgTWF0aC5QSSAvIDI7XG5cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhiYWxsLngsIGJhbGwueSwgYmFsbC5yYWRpdXMgKiAyLCBhbmdsZSArIE1hdGguUEkgLyAyLCBhbmdsZSAtIE1hdGguUEkgLyAyKTtcbiAgICBjdHguYXJjKGRyYWdQb3NpdGlvbi54LCBkcmFnUG9zaXRpb24ueSwgYmFsbC5yYWRpdXMsIGFuZ2xlIC0gTWF0aC5QSSAvIDIsIGFuZ2xlICsgTWF0aC5QSSAvIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0hvbGUoY3R4LCBob2xlKSB7XG4gICAgY3R4LnNhdmUoKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjNGI3ZjFmJztcbiAgICBjdHgubGluZVdpZHRoID0gMjtcblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKGhvbGUueCwgaG9sZS55LCBob2xlLnJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRocm90dGxlKGZuLCB0aHJlc2hob2xkLCBzY29wZSkge1xuICAgIHRocmVzaGhvbGQgfHwgKHRocmVzaGhvbGQgPSAyNTApO1xuICAgIHZhciBsYXN0LCBkZWZlclRpbWVyO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHNjb3BlIHx8IHRoaXM7XG5cbiAgICAgIHZhciBub3cgPSArbmV3IERhdGUoKSxcbiAgICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKGxhc3QgJiYgbm93IDwgbGFzdCArIHRocmVzaGhvbGQpIHtcbiAgICAgICAgLy8gaG9sZCBvbiB0byBpdFxuICAgICAgICBjbGVhclRpbWVvdXQoZGVmZXJUaW1lcik7XG4gICAgICAgIGRlZmVyVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsYXN0ID0gbm93O1xuICAgICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICB9LCB0aHJlc2hob2xkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxhc3QgPSBub3c7XG4gICAgICAgIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pKCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvamF2YXNjcmlwdC9nb2xmL2NsaWVudC9zcmMvYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAyNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///247\n")}});