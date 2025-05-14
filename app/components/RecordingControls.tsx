import { Link } from "react-router";
import { Button } from "./ui/button";
import { ArrowLeft, Download, Play, Square } from "lucide-react";
import { toast } from "sonner";

interface RecordingControlsProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  recordedVideo: string | null;
  elapsedTime: number;
}

export default function RecordingControls({
  isRecording,
  onStartRecording,
  onStopRecording,
  recordedVideo,
  elapsedTime,
}: RecordingControlsProps) {
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);

    const seconds = timeInSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const downloadVideo = () => {
    if (recordedVideo) {
      const a = document.createElement("a");

      a.href = recordedVideo;
      a.download = `screen-recording-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success("Download started!");
    }
  };

  return (
    <div className="glass animate-fade-in fixed bottom-8 left-1/2 z-10 flex -translate-x-1/2 transform items-center gap-4 rounded-xl px-6 py-4 shadow-lg">
      <Link to="/">
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
          <ArrowLeft size={18} />
        </Button>
      </Link>

      {isRecording ? (
        <>
          <div className="flex items-center gap-2">
            <div className="bg-destructive animate-pulse-recording h-3 w-3 rounded-full"></div>
            <span className="font-medium">Recording</span>
          </div>

          <div className="text-lg font-semibold">{formatTime(elapsedTime)}</div>

          <Button
            variant="destructive"
            onClick={onStopRecording}
            className="flex items-center gap-2"
          >
            <Square size={18} />
            Stop
          </Button>
        </>
      ) : recordedVideo ? (
        <>
          <Button variant="default" onClick={downloadVideo} className="flex items-center gap-2">
            <Download size={18} />
            Download Recording
          </Button>

          <Button variant="outline" onClick={onStartRecording} className="flex items-center gap-2">
            <Play size={18} />
            New Recording
          </Button>
        </>
      ) : (
        <>
          <span className="font-medium">Ready to record</span>

          <Button
            variant="default"
            onClick={onStartRecording}
            className="from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 flex items-center gap-2 bg-gradient-to-r"
          >
            <Play size={18} />
            Start Recording
          </Button>
        </>
      )}
    </div>
  );
}
