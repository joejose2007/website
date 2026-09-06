import React, { useState } from 'react';
import { Network, Laptop, Smartphone, Router, ShieldAlert, Cpu, Radio, Activity, RefreshCw } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface NetworkDevice {
  id: string;
  name: string;
  type: 'router' | 'workstation' | 'mobile' | 'iot' | 'suspicious';
  ip: string;
  mac: string;
  status: 'online' | 'analyzing' | 'flagged';
  bandwidth: string;
  ports: number[];
  os: string;
  notes: string;
}

const INITIAL_DEVICES: NetworkDevice[] = [
  {
    id: 'gw-1',
    name: 'Primary Gateway (Router)',
    type: 'router',
    ip: '192.168.1.1',
    mac: '24:A4:3C:9B:10:01',
    status: 'online',
    bandwidth: '48.2 Mbps',
    ports: [53, 80, 443],
    os: 'OpenWrt Linux 23.05',
    notes: 'Default local subnet gateway & DNS resolver.',
  },
  {
    id: 'dev-1',
    name: 'Joe Arch Workstation',
    type: 'workstation',
    ip: '192.168.1.104',
    mac: '00:D8:61:3F:8A:22',
    status: 'online',
    bandwidth: '12.4 Mbps',
    ports: [22, 3000, 8080],
    os: 'Arch Linux (Kernel 6.10)',
    notes: 'Primary dev machine running Python network probes & security tooling.',
  },
  {
    id: 'dev-2',
    name: 'Personal Smartphone',
    type: 'mobile',
    ip: '192.168.1.115',
    mac: '8C:85:90:5E:2B:64',
    status: 'online',
    bandwidth: '3.1 Mbps',
    ports: [443],
    os: 'Android 15',
    notes: 'Authenticated local client device.',
  },
  {
    id: 'dev-3',
    name: 'IoT Home Sensor Node',
    type: 'iot',
    ip: '192.168.1.140',
    mac: 'AC:67:B2:77:41:9C',
    status: 'online',
    bandwidth: '45 Kbps',
    ports: [1883],
    os: 'FreeRTOS / ESP32',
    notes: 'Telemetry sensor node transmitting MQTT payloads.',
  },
  {
    id: 'dev-4',
    name: 'Unknown Rogue Transceiver',
    type: 'suspicious',
    ip: '192.168.1.249',
    mac: 'DE:AD:BE:EF:00:13',
    status: 'flagged',
    bandwidth: '18.9 Mbps (Anomalous burst)',
    ports: [4444, 5555, 31337],
    os: 'Unidentified Linux Fingerprint',
    notes: 'ALERT: Unregistered MAC performing ARP scanning and open listener port 4444.',
  },
];

export const NetworkVisualizerDemo: React.FC = () => {
  const [devices] = useState<NetworkDevice[]>(INITIAL_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice>(INITIAL_DEVICES[0]);
  const [isPinging, setIsPinging] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const handleDeviceClick = (device: NetworkDevice) => {
    sounds.playPaperClick();
    setSelectedDevice(device);
  };

  const handleRunPingSweep = () => {
    sounds.playPencilScribble();
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      sounds.playPaperRustle();
    }, 600);
  };

  const filteredDevices = filterType === 'all' 
    ? devices 
    : devices.filter(d => filterType === 'flagged' ? d.status === 'flagged' : d.type === filterType);

  return (
    <div className="bg-[#fcfbf9] sketch-border p-5 my-4 bg-kraft-grid relative">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#28241f] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#e8e2d4] sketch-border-sm flex items-center justify-center">
            <Network className="w-4 h-4 text-[#28241f]" />
          </div>
          <div>
            <h4 className="font-sketch text-xl font-bold tracking-wide">Network Visualizer & Local Monitor</h4>
            <p className="text-xs font-hand text-stone-600 text-base -mt-1">
              Interactive topology map: Device → Router → Device → Device relationships
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRunPingSweep}
            disabled={isPinging}
            className="sketch-button px-3 py-1 bg-[#ebd7b0] hover:bg-[#dfc89f] text-xs font-code font-bold flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
            {isPinging ? 'Scanning Subnet...' : 'Ping ARP Sweep'}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4 text-xs font-code">
        <span className="py-1 px-1 text-stone-500 font-bold">Filter:</span>
        {['all', 'router', 'workstation', 'mobile', 'iot', 'flagged'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              sounds.playPaperClick();
              setFilterType(f);
            }}
            className={`px-2.5 py-0.5 sketch-border-sm capitalize transition-colors ${
              filterType === f ? 'bg-[#28241f] text-white font-bold' : 'bg-[#f0ebe0] hover:bg-[#e4ddce] text-stone-700'
            }`}
          >
            {f === 'flagged' ? '⚠️ Anomalies / Flagged' : f}
          </button>
        ))}
      </div>

      {/* Topology Diagram Container */}
      <div className="p-4 bg-[#f5f1e8] sketch-border-sm mb-4 relative overflow-hidden">
        <div className="text-[11px] font-code text-stone-500 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Interactive Topology Graph (Click device to inspect)</span>
          <span className="flex items-center gap-1 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Subnet: 192.168.1.0/24 Active
          </span>
        </div>

        {/* Central Router Node */}
        <div className="flex flex-col items-center mb-6">
          <button
            type="button"
            onClick={() => handleDeviceClick(devices[0])}
            className={`p-3 sketch-border-sm flex flex-col items-center gap-1 transition-all ${
              selectedDevice.id === 'gw-1' ? 'bg-[#ebd7b0] scale-105 shadow-md' : 'bg-white hover:bg-stone-50'
            }`}
          >
            <Router className="w-6 h-6 text-stone-800" />
            <span className="font-code text-xs font-bold">Router / Gateway</span>
            <span className="font-mono text-[10px] text-stone-500">{devices[0].ip}</span>
          </button>
          {/* Trunk connector line */}
          <div className="w-0.5 h-6 bg-stone-700 my-0.5"></div>
          <div className="w-4/5 h-0.5 bg-stone-700 relative">
            <div className="absolute top-1/2 left-1/4 w-0.5 h-4 bg-stone-700"></div>
            <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-stone-700"></div>
            <div className="absolute top-1/2 left-3/4 w-0.5 h-4 bg-stone-700"></div>
          </div>
        </div>

        {/* Client Devices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {devices.slice(1).map((dev) => {
            const isSelected = selectedDevice.id === dev.id;
            const isFlagged = dev.status === 'flagged';
            return (
              <button
                key={dev.id}
                type="button"
                onClick={() => handleDeviceClick(dev)}
                className={`p-3 sketch-border-sm text-left transition-all relative ${
                  isSelected
                    ? isFlagged
                      ? 'bg-rose-100 border-rose-800 ring-2 ring-rose-700/50 scale-105'
                      : 'bg-[#ebd7b0] scale-105 shadow-md'
                    : isFlagged
                    ? 'bg-rose-50 border-rose-700 hover:bg-rose-100'
                    : 'bg-white hover:bg-stone-50'
                }`}
              >
                {isFlagged && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                    <ShieldAlert className="w-2.5 h-2.5" /> ALERT
                  </span>
                )}
                <div className="flex items-center gap-2 mb-1.5">
                  {dev.type === 'workstation' && <Laptop className="w-4 h-4 text-stone-700" />}
                  {dev.type === 'mobile' && <Smartphone className="w-4 h-4 text-stone-700" />}
                  {dev.type === 'iot' && <Cpu className="w-4 h-4 text-stone-700" />}
                  {dev.type === 'suspicious' && <ShieldAlert className="w-4 h-4 text-red-600" />}
                  <span className="font-code text-xs font-bold truncate">{dev.name}</span>
                </div>
                <div className="font-mono text-[11px] text-stone-600">{dev.ip}</div>
                <div className="font-mono text-[10px] text-stone-400 truncate">{dev.mac}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Card */}
      <div className="p-4 bg-white sketch-border-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-stone-700" />
            <h5 className="font-bold text-sm font-code">{selectedDevice.name}</h5>
            <span className="text-[10px] font-code px-2 py-0.5 bg-stone-100 rounded text-stone-700">
              Type: {selectedDevice.type.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-code">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>Traffic: {selectedDevice.bandwidth}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-code mb-3">
          <div className="p-2 bg-[#f8f5ee] rounded">
            <div className="text-stone-500 text-[10px]">IPv4 Address:</div>
            <div className="font-bold font-mono">{selectedDevice.ip}</div>
          </div>
          <div className="p-2 bg-[#f8f5ee] rounded">
            <div className="text-stone-500 text-[10px]">MAC Address:</div>
            <div className="font-bold font-mono text-[11px]">{selectedDevice.mac}</div>
          </div>
          <div className="p-2 bg-[#f8f5ee] rounded">
            <div className="text-stone-500 text-[10px]">Detected OS:</div>
            <div className="font-bold truncate">{selectedDevice.os}</div>
          </div>
          <div className="p-2 bg-[#f8f5ee] rounded">
            <div className="text-stone-500 text-[10px]">Open Ports:</div>
            <div className="font-bold font-mono">
              {selectedDevice.ports.map(p => `:${p}`).join(', ')}
            </div>
          </div>
        </div>

        <div className={`p-2.5 rounded text-xs font-code ${
          selectedDevice.status === 'flagged' ? 'bg-rose-50 text-rose-900 border border-rose-200' : 'bg-stone-50 text-stone-700'
        }`}>
          <strong>Security Telemetry Notes:</strong> {selectedDevice.notes}
        </div>
      </div>
    </div>
  );
};
