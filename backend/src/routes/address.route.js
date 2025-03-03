import express, {Router} from "express"

const router = Router();

router.route("/add").post(addAddress)