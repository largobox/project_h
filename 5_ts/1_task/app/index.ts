import { Rectangle } from "./lib"

type CalculateAreaT = Rectangle['calculateArea'];

type ArgumentTypesT<F extends Function> = F extends (...args: infer A) => any ? A : never;

type Arguments = ArgumentTypesT<CalculateAreaT>;

type Size = Arguments[0];

const size: Size = {
	width: null,
	height: 10
}
