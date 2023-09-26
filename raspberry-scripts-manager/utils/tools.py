import logging

import coloredlogs

logger = logging.getLogger(f'{"main"}:{"loger"}')
fmt = f"%(asctime)s.%(msecs)03d .%(levelname)s \t%(message)s"
coloredlogs.install(
    level=logging.DEBUG, logger=logger, milliseconds=True, datefmt="%X", fmt=fmt
)
