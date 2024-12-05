"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
import { fetchSessionData } from "@/providers/data-provider";

interface SensorData {
  _id: string;
  name: string;
  type: string;
  location: string;
  ipAddress: string;
  macAddress?: string;
  firmwareVersion: string;
  lastConnection: string;
  isActive: boolean;
  resolution?: string;
  configuration?: {
    sensitivity: number;
    lifetime: number;
    maxTemperature: number;
  };
}

const SessionData = ({ sessionId }: { sessionId: string }) => {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const sessionData = await fetchSessionData(sessionId);
      setData(sessionData);
      setLoading(false);
    };

    loadData();
  }, [sessionId]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Session Data
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">Type: {item.type}</Typography>
                  <Typography variant="body1">Location: {item.location}</Typography>
                  <Typography variant="body1">IP Address: {item.ipAddress}</Typography>
                  {item.macAddress && (
                    <Typography variant="body1">
                      MAC Address: {item.macAddress}
                    </Typography>
                  )}
                  <Typography variant="body1">
                    Firmware: {item.firmwareVersion}
                  </Typography>
                  <Typography variant="body1">
                    Last Connection: {new Date(item.lastConnection).toLocaleString()}
                  </Typography>
                  <Typography variant="body1">
                    Active: {item.isActive ? "Yes" : "No"}
                  </Typography>
                  {item.resolution && (
                    <Typography variant="body1">
                      Resolution: {item.resolution}
                    </Typography>
                  )}
                  {item.configuration && (
                    <>
                      <Typography variant="body2">
                        Sensitivity: {item.configuration.sensitivity}
                      </Typography>
                      <Typography variant="body2">
                        Lifetime: {item.configuration.lifetime}
                      </Typography>
                      <Typography variant="body2">
                        Max Temperature: {item.configuration.maxTemperature}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SessionData;
