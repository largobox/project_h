import { Rectangle } from "lib/index.d.ts"

type CalculateAreaT = Rectangle['calculateArea'];

type ArgumentTypesT<F extends Function> = F extends (...args: infer A) => any ? A : never;

type Arguments = ArgumentTypesT<CalculateAreaT>;

type Size = Arguments[0]; // тип CustomSize из Rectangle

// const size: Size = {
// 	width: 11,
// 	height: 10
// }
