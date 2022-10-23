use js_sys::Uint8Array;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b;
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn it_works() {
    let result = add(1, 2);
    assert_eq!(result, 3);
  }
}

#[wasm_bindgen]
pub extern "C" fn svg2pdf(svg: &str) -> Uint8Array {
  let pdf = svg2pdf::convert_str(&svg, svg2pdf::Options::default()).unwrap();
  Uint8Array::new(&unsafe { Uint8Array::view(&pdf) }.into())
}
