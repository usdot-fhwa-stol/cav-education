from binascii import hexlify, unhexlify
from . import J2735
import logging
import json

class MessageFrameDecoder():

    def decode(self, data):
        logging.debug('Unhexlify Data')
        try:
            dsrc_data = unhexlify(data).decode('utf-8')

            logging.debug("Incomming UPER")
            logging.debug(dsrc_data)

            if(dsrc_data.startswith("0014")):
                return self.bsm_decoder(dsrc_data)

            elif(dsrc_data.startswith("0013")):
                return self.spat_decoder(dsrc_data)

            elif(dsrc_data.startswith("0012")):
                return self.map_decoder(dsrc_data)

        except Exception as e:
            logging.exception(e)
            return None,None
    
    def bsm_decoder(self,dsrc_data):
        unhex_data = unhexlify(dsrc_data)
        msg = J2735.DSRC.MessageFrame
        msg.from_uper(unhex_data)

        logging.debug("decoded message")
        logging.debug(msg.__dict__)

        key = msg()['value'][0]
        msg()['value'][1]['coreData']['id'] = str(msg()['value'][1]['coreData']['id'])
        record_value = json.dumps(msg()['value'][1])

        return key,record_value

    def map_decoder(self,dsrc_data):
        unhex_data = unhexlify(dsrc_data)
        key = "MapData"
        msg = J2735.DSRC.MapData
        msg.from_uper(unhex_data)

        logging.debug("decoded message")
        logging.debug(msg.__dict__)

        record_value = json.dumps(msg())

        return key,record_value

    def spat_decoder(self,dsrc_data):
        unhex_data = unhexlify(dsrc_data)
        msg = J2735.DSRC.MessageFrame
        msg.from_uper(unhex_data)

        logging.debug("decoded message")
        logging.debug(msg.__dict__)

        key = msg()['value'][0]
        msg()["value"][1]['regional'][0]['regExtValue'] = [msg()["value"][1]['regional'][0]['regExtValue'][0],str(msg()["value"][1]['regional'][0]['regExtValue'][1])]

        record_value = json.dumps(msg()["value"][1])

        return key,record_value
