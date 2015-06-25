# # # # # #
#
# Simple script to encode framegrabber output to mp4
# by T-101 / Darklite
#
#
#!/bin/sh

# Change this to your liking. Smaller value, smaller file.
VIDEOQUALITY=6000k

# Here be dragons
FFMPEG_STATUS=0
AVCONV_STATUS=0

if [ ! -f audio.wav ]; then
	echo "Fatal! audio.wav does not exist"
	exit 255
fi

which ffmpeg > /dev/null
if [ $? -eq 0 ]; then FFMPEG_STATUS=1
fi

which avconv > /dev/null
if [ $? -eq 0 ]; then AVCONV_STATUS=1
fi

if [ $FFMPEG_STATUS -eq 1 ]; then
	echo "Using ffmpeg"
	# Settings tested with FFmpeg version 0.6.5
	ffmpeg -r 60 -i 'frames/frame_%06d.png' -i audio.wav -vcodec libx264 -vpre medium -b $VIDEOQUALITY -acodec aac -strict experimental -ab 192k demo.mp4
	exit $?
fi

if [ $AVCONV_STATUS -eq 1 ] && [ $FFMPEG_STATUS -eq 0 ]; then
	echo "Using avconv"
	# Settings tested with avconv version 9.18
	avconv -r 60 -start_number 1 -i 'frames/frame_%06d.png' -i audio.wav -c:v h264 -b:v $VIDEOQUALITY -c:a aac -strict experimental -b:a 192k -shortest demo.mp4
	exit $?
fi

if [ $FFMPEG_STATUS -eq 0 ] && [ $AVCONV_STATUS -eq 0 ]; then
	echo "Fatal! ffmpeg or avconv not found. Please install either"
	exit 255
fi
