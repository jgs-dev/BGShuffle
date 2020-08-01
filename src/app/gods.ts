import { God } from "./god"

/**
 * @constant GODS: this variable has all source images of the gods that we will be using
 * shuffling in the game
 */
export const GODSTITANS: God[] = [
    { name: "ares", src: "./../assets/img/ares.png" },
    { name: "athena", src: "./../assets/img/athena.png" },
    { name: "kronos", src: "./../assets/img/kronos.png" },
    { name: "poseidon", src: "./../assets/img/poseidon.png" },
    { name: "zeus", src: "./../assets/img/zeus.png" },
]

export const GODSCLASSIC: God[] = [
    { name: "ares", src: "./../assets/img/ares.png" },
    { name: "athena", src: "./../assets/img/athena.png" },
    { name: "poseidon", src: "./../assets/img/poseidon.png" },
    { name: "zeus", src: "./../assets/img/zeus.png" },
]

/**
 * @constant TURNED: source of the turned god card
 */
export const TURNED: God = { name: "turned", src: "./../assets/img/back.png" }