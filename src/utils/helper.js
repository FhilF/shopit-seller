exports.listType = (item) => {
    if (item.isCancelled === true) return 1;
  
    if (
      !item.isCancelled &&
      !item.isAccepted &&
      !item.isShipped &&
      !item.isDelivered
    )
      return 2;
  
    if (
      !item.isCancelled &&
      item.isAccepted &&
      !item.isShipped &&
      !item.isDelivered
    )
      return 3;
  
    if (
      !item.isCancelled &&
      item.isAccepted &&
      item.isShipped &&
      !item.isDelivered
    )
      return 4;
  
    if (
      !item.isCancelled &&
      item.isAccepted &&
      item.isShipped &&
      item.isDelivered
    )
      return 5;
  };