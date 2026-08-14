"use client";

/**
 * 동물의 숲 주민 말소리(Animalese) 근사 재생기.
 *
 * 샘플 출처: Acedio/animalese.js 의 animalese.wav (CC BY 4.0,
 * https://github.com/Acedio/animalese.js) — A~Z 문자별 음성이 0.15초 간격으로
 * 순서대로 담겨 있다. 한글 음절은 초성(ㅇ이면 중성)의 로마자 근사 첫 글자
 * 샘플을 재생해 옹알이를 만든다.
 */

const ANIMALESE_SRC = "/audio/animalese.wav";
const LIBRARY_LETTER_SECS = 0.15;
const PLAY_LETTER_SECS = 0.08; //글자당 소리 길이.
const BASE_PITCH = 1.3; // 톤 조절
const PITCH_JITTER = 0.12; //  억양 흔들림 폭
const GAIN = 1; // BGM 대비 음량

// prettier-ignore
const CHOSEONG_ROMAN = ["g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s", "ss", "", "j", "jj", "ch", "k", "t", "p", "h"];
// prettier-ignore
const JUNGSEONG_ROMAN = ["a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i"];

const HANGUL_BASE = 0xac00;
const HANGUL_LAST = 0xd7a3;

function toRepresentativeLetter(char: string): string | null {
  const code = char.charCodeAt(0);
  if (code >= HANGUL_BASE && code <= HANGUL_LAST) {
    const index = code - HANGUL_BASE;
    const choseong = Math.floor(index / (21 * 28));
    const jungseong = Math.floor((index % (21 * 28)) / 28);
    const roman = CHOSEONG_ROMAN[choseong] || JUNGSEONG_ROMAN[jungseong];
    return roman[0] ?? null;
  }
  const lower = char.toLowerCase();
  return lower >= "a" && lower <= "z" ? lower : null;
}

let audioContext: AudioContext | null = null;
let bufferPromise: Promise<AudioBuffer> | null = null;

function getBuffer(context: AudioContext) {
  bufferPromise ??= fetch(ANIMALESE_SRC)
    .then((response) => response.arrayBuffer())
    .then((data) => context.decodeAudioData(data))
    .catch((error) => {
      bufferPromise = null;
      throw error;
    });
  return bufferPromise;
}

/** char에 해당하는 Animalese 음을 한 번 재생한다. 소리가 없는 문자는 무시한다. */
export function playAnimalese(char: string) {
  const letter = toRepresentativeLetter(char);
  if (!letter) {
    return;
  }

  audioContext ??= new AudioContext();
  const context = audioContext;
  if (context.state === "suspended") {
    context.resume().catch(() => {});
  }

  getBuffer(context)
    .then((buffer) => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value =
        BASE_PITCH + (Math.random() * 2 - 1) * PITCH_JITTER;

      const gain = context.createGain();
      gain.gain.value = GAIN;
      source.connect(gain).connect(context.destination);

      const offset = (letter.charCodeAt(0) - 97) * LIBRARY_LETTER_SECS;
      source.start(0, offset, PLAY_LETTER_SECS);
    })
    .catch(() => {});
}
