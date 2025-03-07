import { Camera } from "@shared/schema";
import CameraCard from "./camera-card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video, StopCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useGlobalRecordingTime } from "@/hooks/use-global-recording-time";

interface CameraGridProps {
  cameras: Camera[];
  onClone: (camera: Camera) => void;
}

export default function CameraGrid({ cameras, onClone }: CameraGridProps) {
  const { toast } = useToast();
  const [isStartingAll, setIsStartingAll] = useState(false);
  const [isStoppingAll, setIsStoppingAll] = useState(false);

  const anyRecording = cameras.some(camera => camera.isRecording);
  const { formattedTime } = useGlobalRecordingTime(anyRecording);

  const startAllRecordings = async () => {
    setIsStartingAll(true);
    try {
      await apiRequest("POST", "/api/cameras/start-all");
      queryClient.invalidateQueries({ queryKey: ["/api/cameras"] });
      toast({
        title: "Recording started",
        description: "All cameras are now recording",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start recordings",
        variant: "destructive",
      });
    } finally {
      setIsStartingAll(false);
    }
  };

  const stopAllRecordings = async () => {
    setIsStoppingAll(true);
    try {
      await apiRequest("POST", "/api/cameras/stop-all");
      queryClient.invalidateQueries({ queryKey: ["/api/cameras"] });
      toast({
        title: "Recording stopped",
        description: "All cameras have stopped recording",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to stop recordings",
        variant: "destructive",
      });
    } finally {
      setIsStoppingAll(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          variant={anyRecording ? "destructive" : "default"}
          onClick={anyRecording ? stopAllRecordings : startAllRecordings}
          disabled={isStartingAll || isStoppingAll || cameras.length === 0}
          className="flex items-center gap-2 px-4 py-2"
          size="lg"
        >
          {anyRecording ? (
            <>
              <StopCircle className="w-4 h-4" />
              <span className="flex items-center gap-2">
                Stop Recording
                <span className="border-l border-white/20 pl-2 font-mono">
                  {formattedTime}
                </span>
              </span>
            </>
          ) : (
            <>
              <Video className="w-4 h-4" />
              Start All Recordings
            </>
          )}
        </Button>
      </div>

      {cameras.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">No cameras found</h2>
          <p className="text-muted-foreground mt-2">
            Add a camera to start monitoring
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cameras.map((camera) => (
            <CameraCard key={camera.id} camera={camera} onClone={onClone} />
          ))}
        </div>
      )}
    </div>
  );
}