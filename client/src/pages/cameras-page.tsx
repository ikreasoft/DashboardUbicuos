import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Camera } from "@shared/schema";
import { useState } from "react";
import CameraGrid from "@/components/camera-grid";
import AddCameraDialog from "@/components/add-camera-dialog";

export default function CamerasPage() {
  const { user } = useAuth();
  const [addCameraOpen, setAddCameraOpen] = useState(false);
  const [cameraToClone, setCameraToClone] = useState<Camera | undefined>();

  const { data: cameras, isLoading } = useQuery<Camera[]>({
    queryKey: ["/api/cameras"],
  });

  const handleClone = (camera: Camera) => {
    setCameraToClone(camera);
    setAddCameraOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Cámaras</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => {
            setCameraToClone(undefined);
            setAddCameraOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Agregar Cámara
        </Button>
      </div>

      <CameraGrid 
        cameras={cameras || []} 
        onClone={handleClone}
      />

      <AddCameraDialog
        open={addCameraOpen}
        onOpenChange={setAddCameraOpen}
        cloneFrom={cameraToClone}
      />
    </div>
  );
}
