import _ from "lodash";

export default function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  // converts the array to a lodash object, so that we can chain the methods
  // _(items)

  // slices the array starting from the index
  //_.slice(items, startIndex);

  //_.take()

  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
