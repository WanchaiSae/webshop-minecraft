import express from 'express';
import {
  addItems,
  getItemPlayer,
  listItem,
  listItems,
  removeItem,
} from '../controllers/itemsController';

const router = express.Router();

router.post('/add', addItems);
router.get('/get/:player/:itemId', getItemPlayer);
router.get('/', listItems);
router.get('/:itemId', listItem);
router.delete('/:itemId', removeItem);

export default router;
