import interact from "https://cdn.interactjs.io/v1.9.20/interactjs/index.js";
// import interact from "interactjs";
import { Game } from "./Game.js";

const gameplay = new Game();

/**
 * A partir de um id cria uma zona de drop.
 * @param {String} trash_id id html da lixeira. Ex: #trashPapel
 */
function dropzone(trash_obj) {
  interact(trash_obj.trash_id)
    .dropzone({
      accept: trash_obj.acceptable_class,
      overlap: 0.5,
      ondrop: (event) => {
        var draggableElement = event.relatedTarget;
        draggableElement.remove();

        if(trash_obj['trash_id'].substring(6) == draggableElement.className.split(' ')[1].substring(3)){
          gameplay.earnPoints();
        }
        else{
          gameplay.badChoice(draggableElement.className.split(' ')[1]);
        }
      },
    });
}

/**
 *  Torna um objeto arrastável
 * @param {String} obj_id id html do lixo. Ex: #objPapel
 */
function draggable(obj_id) {
  interact(obj_id).draggable({
    inertia: false,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "#main",
      }),
    ],
    listeners: { move: dragMoveListener },
  });
}

function dragMoveListener(event) {
  let target = event.target;
  // calcula a posição final do objeto
  let x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  let y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // realiza a mudança visual do objeto, através de uma transformação
  target.style.transform = `translate(${x}px, ${y}px)`;

  // atualiza a posição do objeto
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

export { dropzone, draggable };
