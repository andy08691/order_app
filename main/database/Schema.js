import Realm from 'realm';

class OrderHistorySchema extends Realm.Object {
  static schema = {
    name: 'OrderHistory',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      orderDate: 'date',
      userId: 'string',
      amount: 'int',
      orderItems: {
        type: 'list',
        objectType: 'OrderItems',
      },
    },
  };
}

class OrderItemsSchema extends Realm.Object {
  static schema = {
    name: 'OrderItems',
    properties: {
      id: 'int',
      count: 'int',
      unitPrice: 'int',
      totalPrice: 'int',
      name: 'string',
    },
  };
}

export default new Realm({
  path: 'Order.realm',
  schema: [OrderHistorySchema, OrderItemsSchema],
  schemaVersion: 1,
  migration: (oldRealm, newRealm) => {
    // only apply this change if upgrading to schemaVersion 1
  },
});
