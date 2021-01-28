from binascii import hexlify, unhexlify
from . import J2735
import logging

class MessageFrameDecoder():
    msg = J2735.DSRC.MessageFrame

    def decode(self, data):
        logging.info('Unhexlify Data')
        try:
            unhex_data = unhexlify(unhexlify(data).decode('utf-8'))
        except Exception as e:
            logging.exception(e)

        logging.info('Loading message from uper')
        try:
            self.msg.from_uper(unhex_data)
            self.msg()['value'][1]['coreData']['id'] = str(self.msg()['value'][1]['coreData']['id'])
        except Exception as e:
            logging.exception(e)

        return self.msg