/* global ic */
export default function ajax() {
    return ic.ajax['default'].apply(null, arguments);
}
