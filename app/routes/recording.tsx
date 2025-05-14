import { useEffect, useRef, useState } from "react";
import RecordingControls from "~/components/RecordingControls";
import { Play } from "lucide-react";
import { toast } from "sonner";

export function meta() {
  return [
    { title: "ScreenCapture" },
    {
      name: "description",
      content:
        "Record your screen with just a few clicks. No downloads, no installations, just a simple web app that makes screen recording effortless.",
    },
  ];
}

export default function Recording() {
  const [isRecording, setIsRecording] = useState(false);

  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);

  const [elapsedTime, setElapsedTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const recordedChunksRef = useRef<Blob[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      if (recordedVideo) {
        URL.revokeObjectURL(recordedVideo);
      }
    };
  }, [recordedVideo]);

  const startRecording = async () => {
    try {
      recordedChunksRef.current = [];
      setRecordedVideo(null);

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "monitor",
        },
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });

        const url = URL.createObjectURL(blob);

        setRecordedVideo(url);

        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());

        // Reset elapsed time
        setElapsedTime(0);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };

      // Start recording
      mediaRecorderRef.current.start(100);
      setIsRecording(true);

      // Start timer
      setElapsedTime(0);
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);

      toast.success("Recording started");

      // Add event listener for when user stops sharing
      stream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };
    } catch (err) {
      console.error("Error starting recording:", err);
      toast.error(
        "Failed to start recording. Please make sure to grant screen sharing permissions.",
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      toast.success("Recording completed");
    }
  };

  return (
    <>
      <div className="container mx-auto mt-32 max-w-5xl px-4">
        <div className="border-border mb-6 flex aspect-video items-center justify-center overflow-hidden rounded-xl border bg-black/10">
          {isRecording || recordedVideo ? (
            <video
              ref={videoRef}
              autoPlay
              muted={isRecording}
              controls={!isRecording && !!recordedVideo}
              className="h-full w-full object-contain"
              src={!isRecording ? recordedVideo || undefined : undefined}
            />
          ) : (
            <div className="p-12 text-center">
              <div className="bg-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Play size={32} className="text-primary ml-1" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Ready to Record</h3>
              <p className="text-muted-foreground">
                Click the Start Recording button below to begin capturing your screen
              </p>
            </div>
          )}
        </div>

        {recordedVideo && !isRecording && (
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-xl font-medium">Your Recording is Ready!</h2>
            <p className="text-muted-foreground mb-4">
              You can download your recording or start a new one.
            </p>
          </div>
        )}
      </div>

      <RecordingControls
        isRecording={isRecording}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        recordedVideo={recordedVideo}
        elapsedTime={elapsedTime}
      />
    </>
  );
}
