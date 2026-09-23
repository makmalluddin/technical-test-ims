import express from 'express';
import { createSimulasi, getContractDetail, deleteContract, updatePayment } from "../controller/controller.js";

const router = express.Router();

router.post('/simulasi', createSimulasi);
router.get('/:contractNo', getContractDetail);
router.delete('/:contractNo', deleteContract);
router.patch('/:contractNo/angsuran/:angsuranKe', updatePayment);

export default router;
