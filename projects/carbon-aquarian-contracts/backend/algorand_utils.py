import os, time
from dotenv import load_dotenv
from algosdk.v2client import algod
from algosdk import transaction, mnemonic

load_dotenv()

ALGOD_ADDRESS = os.getenv("ALGOD_ADDRESS", "http://localhost:4001")
ALGOD_TOKEN   = os.getenv("ALGOD_TOKEN",   "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS)

def wait_for_confirmation(client, txid):
    while True:
        res = client.pending_transaction_info(txid)
        if res.get("confirmed-round", 0) > 0:
            return res
        client.status_after_block(client.status()["last-round"] + 1)
        time.sleep(0.1)

def send_carbon_points(sender_mnemonic: str, sender_addr: str, receiver_addr: str, asset_id: int, amount: int):
    sender_pk = mnemonic.to_private_key(sender_mnemonic)
    sp = client.suggested_params()
    txn = transaction.AssetTransferTxn(
        sender=sender_addr, sp=sp, receiver=receiver_addr, amt=int(amount), index=int(asset_id)
    )
    stxn = txn.sign(sender_pk)
    txid = client.send_transaction(stxn)
    wait_for_confirmation(client, txid)
    return txid
