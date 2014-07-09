#! /bin/sh
PATH=/home/web/local/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
NAME=nodesite
FLAGS="--expose-gc --nouse-idle-notification --max-new-space-size=2048 --max-old-space-size=14336"
SERVER="/home/web/local/bin/naught"
DAEMON="/home/web/local/bin/node"
SITE="/home/web/code/$NAME"
DESC="$NAME naught service"
NAUGHTARGS="--cwd $SITE --worker-count 2 --ipc-file /var/run/$NAME.ipc"

test -x $DAEMON || exit 155
test -x $SERVER || exit 156

set -e

case "$1" in
  start)
    echo -n "Starting $DESC: \n"
    $DAEMON $FLAGS $SERVER start $NAUGHTARGS $SITE/server/app.js
    ;;
  stop)
    echo -n "Stopping $DESC: \n"
    $DAEMON $FLAGS $SERVER stop --timeout 30 /var/run/$NAME.ipc
    ;;
  reload)
    echo -n "Reloading $DESC: \n"
    $DAEMON $FLAGS $SERVER deploy --cwd $SITE --timeout 30 /var/run/$NAME.ipc
  ;;
  status)
    $DAEMON $FLAGS $SERVER status /var/run/$NAME.ipc
    exit $?
  ;;
  restart|force-reload)
    echo -n "Restarting $DESC: \n"
    $DAEMON $FLAGS $SERVER deploy --timeout 60 /var/run/$NAME.ipc
    if [ $? -ne "0" ]; then
      $0 stop
      $0 start
      exit $?
    fi
    echo "$NAME."
    ;;
  *)
    N=/etc/init.d/$NAME
    # echo "Usage: $N {start|stop|restart|reload|force-reload}" >&2
    echo "Usage: $N {start|stop|restart|force-reload}" >&2
    exit 1
    ;;
esac

exit 0