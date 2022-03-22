import Schema from './Schema';
import realm from 'realm';
export async function createOrderHistory(userId, data) {
  console.log('createOrderHistory', userId, data);
  const tasks = Schema.objects('OrderHistory');
  console.log('tasks', tasks);
  // console.log(`The lists of open tasks are: ${tasks.map(task => task.userId)}`);
  let data_temp = {
    _id: Date.now().toString(),
    orderDate: new Date(),
    userId: userId,
    amount: data.amount,
    orderItems: data.orderItems,
  };
  try {
    await Schema.write(() => {
      Schema.create('OrderHistory', data_temp);
      console.log('===== [createOrderHistory] complete');
      return true;
    });
    // Schema.close();
  } catch (error) {
    console.log('error', error);
    return false;
  }
}

export function searchOrderHistory(userId) {
  const realmObjects = Schema.objects('OrderHistory');
  const results = realmObjects.filtered('userId == $0', userId).sorted('orderDate', true);
  results.map(result => {
    console.log('result', result);
  });
  return results;
}
