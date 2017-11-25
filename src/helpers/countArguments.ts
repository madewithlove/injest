export default function countArguments(...args): number {
    return args.filter(argument => typeof argument !== 'undefined').length;
}