import React, { useState, useEffect } from "react";

// ─── Themes ──────────────────────────────────────────────────────────────────

const THEMES = {
  classic: {
    label: "Classic", desc: "Dark felt casino",
    bgGrad: "radial-gradient(ellipse at 50% 30%, #1a3a1a 0%, #091a0d 60%, #060e08 100%)",
    surface: "rgba(0,0,0,0.22)", surfaceBorder: "rgba(240,192,64,0.18)",
    accent: "#f0c040", accentDim: "rgba(240,192,64,0.14)", accentBorder: "rgba(240,192,64,0.3)",
    textDim: "#3a6a3a", textMid: "#5a8a5a", textBright: "#f0e8c0", titleColor: "#f0c040",
    logBg: "rgba(0,0,0,0.35)", logBorder: "rgba(240,192,64,0.15)", logText: "#6aaa6a",
    statBg: "rgba(0,0,0,0.2)", statBorder: "rgba(255,255,255,0.06)",
    tileBg: "#fdf6e3", tileText: "#2a1a00", tileBorder: "#8b6914",
    tileClosedBg: "#2a4a2a", tileClosedBorder: "#1a3a1a",
    tileSelBg: "#f5c518", tileSelText: "#1a0f00", tileSelBorder: "#a07800",
    tileSelShadow: "0 0 0 3px rgba(245,197,24,0.4), 0 4px 12px rgba(245,197,24,0.5)",
    tileCursedBg: "rgba(180,20,20,0.25)", tileCursedText: "#e74c3c", tileCursedBorder: "#e74c3c",
    danger: "#e74c3c",
    btnGold: { bg: "linear-gradient(180deg,#d4a830,#a07820)", color: "#1a0f00", border: "#7a5810" },
    btnGoldDis: { bg: "#3a3020", color: "#5a4a30", border: "#2a2010" },
    btnGreen: { bg: "linear-gradient(180deg,#4a7a4a,#2a5a2a)", color: "#e8f4e8", border: "#1a4a1a" },
    btnGreenDis: { bg: "#2a3a2a", color: "#4a5a4a", border: "#1a2a1a" },
    btnRed: { bg: "linear-gradient(180deg,#c84040,#902020)", color: "#ffe8e8", border: "#701010" },
    btnRedDis: { bg: "#3a2020", color: "#5a3030", border: "#2a1010" },
    dieBg: "#fdf6e3", dieBorder: "#8b6914", diePip: "#2a1a00",
    dieRollShadow: "0 0 0 3px #c8a832, 0 4px 16px rgba(0,0,0,0.4)",
    safeLabel: "#6aaa6a", riskLabel: "#c87070",
    safePanelBorder: "rgba(60,100,60,0.3)", riskPanelBorder: "rgba(100,40,40,0.3)",
  },
  bright: {
    label: "Bright", desc: "Navy to purple evening",
    bgGrad: "radial-gradient(ellipse at 50% 30%, #2a3a6a 0%, #1a2a4a 60%, #2a1a3a 100%)",
    surface: "rgba(255,255,255,0.07)", surfaceBorder: "rgba(100,180,255,0.18)",
    accent: "#64b4ff", accentDim: "rgba(100,180,255,0.14)", accentBorder: "rgba(100,180,255,0.3)",
    textDim: "#6090b0", textMid: "#90b8d8", textBright: "#e0f0ff", titleColor: "#64b4ff",
    logBg: "rgba(0,0,0,0.3)", logBorder: "rgba(100,180,255,0.15)", logText: "#90b8d8",
    statBg: "rgba(255,255,255,0.04)", statBorder: "rgba(255,255,255,0.08)",
    tileBg: "#e8f0ff", tileText: "#1a2a4a", tileBorder: "#4a6aaa",
    tileClosedBg: "#1a2a5a", tileClosedBorder: "#0a1a4a",
    tileSelBg: "#64b4ff", tileSelText: "#0a1a2a", tileSelBorder: "#3a84cf",
    tileSelShadow: "0 0 0 3px rgba(100,180,255,0.4), 0 4px 12px rgba(100,180,255,0.5)",
    tileCursedBg: "rgba(200,30,60,0.2)", tileCursedText: "#ff5577", tileCursedBorder: "#ff5577",
    danger: "#ff5577",
    btnGold: { bg: "linear-gradient(180deg,#64b4ff,#3a84cf)", color: "#0a1a2a", border: "#2a64af" },
    btnGoldDis: { bg: "rgba(100,180,255,0.1)", color: "#3a5a7a", border: "rgba(100,180,255,0.2)" },
    btnGreen: { bg: "linear-gradient(180deg,#4a7aaa,#2a5a8a)", color: "#e0f0ff", border: "#1a4a7a" },
    btnGreenDis: { bg: "rgba(255,255,255,0.05)", color: "#3a5a7a", border: "rgba(255,255,255,0.1)" },
    btnRed: { bg: "linear-gradient(180deg,#cc2244,#991122)", color: "#ffe8ee", border: "#771122" },
    btnRedDis: { bg: "rgba(200,30,60,0.1)", color: "#5a2a3a", border: "rgba(200,30,60,0.2)" },
    dieBg: "#e8f0ff", dieBorder: "#4a6aaa", diePip: "#1a2a4a",
    dieRollShadow: "0 0 0 3px #64b4ff, 0 4px 16px rgba(0,0,0,0.4)",
    safeLabel: "#90b8d8", riskLabel: "#ff5577",
    safePanelBorder: "rgba(100,180,255,0.2)", riskPanelBorder: "rgba(255,85,119,0.2)",
  },
  neon: {
    label: "Neon", desc: "Electric glow",
    bgGrad: "radial-gradient(ellipse at 50% 30%, #1a0030 0%, #0a0015 60%, #000510 100%)",
    surface: "rgba(255,255,255,0.03)", surfaceBorder: "rgba(0,255,204,0.2)",
    accent: "#00ffcc", accentDim: "rgba(0,255,204,0.1)", accentBorder: "rgba(0,255,204,0.3)",
    textDim: "#440066", textMid: "#882299", textBright: "#dd88ff", titleColor: "#ff00aa",
    logBg: "rgba(0,0,0,0.5)", logBorder: "rgba(0,255,204,0.15)", logText: "#00ffcc",
    statBg: "rgba(0,0,0,0.3)", statBorder: "rgba(0,255,204,0.1)",
    tileBg: "#0d0020", tileText: "#00ffcc", tileBorder: "#440066",
    tileClosedBg: "#050010", tileClosedBorder: "#220033",
    tileSelBg: "#00ffcc", tileSelText: "#000510", tileSelBorder: "#00ccaa",
    tileSelShadow: "0 0 0 3px rgba(0,255,204,0.4), 0 0 20px rgba(0,255,204,0.6)",
    tileCursedBg: "rgba(255,0,102,0.15)", tileCursedText: "#ff0066", tileCursedBorder: "#ff0066",
    danger: "#ff0066",
    btnGold: { bg: "linear-gradient(180deg,#00ffcc,#00ccaa)", color: "#000510", border: "#00aa88" },
    btnGoldDis: { bg: "rgba(0,255,204,0.06)", color: "#224433", border: "rgba(0,255,204,0.1)" },
    btnGreen: { bg: "linear-gradient(180deg,#7700cc,#550099)", color: "#ffccff", border: "#440077" },
    btnGreenDis: { bg: "rgba(119,0,204,0.08)", color: "#330044", border: "rgba(119,0,204,0.15)" },
    btnRed: { bg: "linear-gradient(180deg,#ff0066,#cc0044)", color: "#fff0f5", border: "#aa0033" },
    btnRedDis: { bg: "rgba(255,0,102,0.08)", color: "#440022", border: "rgba(255,0,102,0.15)" },
    dieBg: "#0d0020", dieBorder: "#440066", diePip: "#00ffcc",
    dieRollShadow: "0 0 0 3px #00ffcc, 0 0 20px rgba(0,255,204,0.5)",
    safeLabel: "#00ffcc", riskLabel: "#ff0066",
    safePanelBorder: "rgba(0,255,204,0.2)", riskPanelBorder: "rgba(255,0,102,0.2)",
  },
};

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_TILES = 12;
const SAFE_DIE_FACES = ["blank", "blank", "blank", "+1", "+2", "wild"];
const RISK_DIE_FACES = ["wild", "wild", "flip", "x2", "+3", "bust"];

const FACE_LABELS = {
  blank: "—", "+1": "+1", "+2": "+2", "+3": "+3",
  wild: "★ Wild", flip: "⇅ Flip", x2: "×2", bust: "💀 Bust",
};

const FACE_COLORS = {
  blank: "#8aab8a", "+1": "#c8b560", "+2": "#c8b560", "+3": "#e07840",
  wild: "#7bafd4", flip: "#b07fc8", x2: "#e07840", bust: "#c84040",
};

const PHASE = {
  IDLE: "idle", ROLLED: "rolled", EVENT_ROLLED: "event",
  FLIP_PICK: "flip_pick", BUST_PICK: "bust_pick", GAME_OVER: "game_over",
};

const MODE = { SOLO: "solo", LOWEST: "lowest", SUDDEN: "sudden" };

const BOARD_PRESETS = {
  classic: { label: "Classic", desc: "1–9",     tiles: [1,2,3,4,5,6,7,8,9] },
  full:    { label: "Full",    desc: "1–12",    tiles: [1,2,3,4,5,6,7,8,9,10,11,12] },
  custom:  { label: "Custom",  desc: "Pick your own", tiles: null },
};

// ─── Pure helpers ─────────────────────────────────────────────────────────────

function rollD6() { return Math.floor(Math.random() * 6) + 1; }

function getDotPositions(n) {
  return {
    1:[[50,50]], 2:[[25,25],[75,75]], 3:[[25,25],[50,50],[75,75]],
    4:[[25,25],[75,25],[25,75],[75,75]], 5:[[25,25],[75,25],[50,50],[25,75],[75,75]],
    6:[[25,22],[75,22],[25,50],[75,50],[25,78],[75,78]],
  }[n] || [];
}

function initialTiles(nums) {
  const t = {};
  (nums || Array.from({length:TOTAL_TILES},(_,i)=>i+1)).forEach(n => { t[n] = "open"; });
  return t;
}

function calcScore(tiles) {
  return Object.entries(tiles).filter(([,s])=>s!=="closed").reduce((sum,[n])=>sum+parseInt(n),0);
}

function validCombos(total, tiles) {
  const open = Object.entries(tiles).filter(([,s])=>s==="open").map(([n])=>parseInt(n));
  const results = [];
  function bt(rem, start, chosen) {
    if (rem===0) { results.push([...chosen]); return; }
    for (let i=start; i<open.length; i++) {
      if (open[i]<=rem) { chosen.push(open[i]); bt(rem-open[i],i+1,chosen); chosen.pop(); }
    }
  }
  bt(total,0,[]);
  return results;
}

// ─── Shared UI components ─────────────────────────────────────────────────────

function Btn({ onClick, disabled, children, variant="green", t }) {
  const key = variant==="gold" ? "btnGold" : variant==="red" ? "btnRed" : "btnGreen";
  const disKey = key + "Dis";
  const s = disabled ? t[disKey] : t[key];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: s.bg, color: s.color,
      border: `2px solid ${s.border}`,
      padding: "10px 18px", borderRadius: 8,
      fontFamily:"'Georgia',serif", fontWeight:"bold", fontSize:13,
      cursor: disabled?"not-allowed":"pointer",
      boxShadow: disabled?"none":"0 3px 8px rgba(0,0,0,0.35)",
      transition:"all 0.15s", letterSpacing:0.3, whiteSpace:"nowrap",
    }}>{children}</button>
  );
}

function GameLog({ entries, t }) {
  return (
    <div style={{
      maxHeight:110, overflowY:"auto",
      background: t.logBg, border:`1px solid ${t.logBorder}`,
      borderRadius:8, padding:"8px 12px",
      fontFamily:"monospace", fontSize:12, color:t.logText,
      display:"flex", flexDirection:"column-reverse", gap:2,
    }}>
      {entries.length===0
        ? <span style={{color:t.textDim}}>Game log will appear here…</span>
        : entries.map((e,i)=><div key={i}>{e}</div>)
      }
    </div>
  );
}

function Die({ value, rolling, t }) {
  const dots = getDotPositions(value||1);
  return (
    <div style={{
      width:60, height:60, flexShrink:0, position:"relative",
      background: t.dieBg, border:`3px solid ${t.dieBorder}`, borderRadius:12,
      boxShadow: rolling ? t.dieRollShadow : "inset 0 2px 4px rgba(255,255,255,0.15), 0 4px 8px rgba(0,0,0,0.4)",
      transition:"box-shadow 0.15s",
      animation: rolling ? "dieSpin 0.35s ease-out" : "none",
    }}>
      {dots.map(([x,y],i)=>(
        <div key={i} style={{
          position:"absolute", width:9, height:9, borderRadius:"50%",
          background: t.diePip,
          left:`calc(${x}% - 4.5px)`, top:`calc(${y}% - 4.5px)`,
        }}/>
      ))}
    </div>
  );
}

function TileEl({ number, state, onClick, selectable, selected, t }) {
  const isClosed = state==="closed", isCursed = state==="cursed";
  let bg=t.tileBg, color=t.tileText, border=`2px solid ${t.tileBorder}`;
  let opacity=1, shadow="0 3px 6px rgba(0,0,0,0.35)";

  if (isClosed) {
    bg=t.tileClosedBg; color=t.tileClosedBg; border=`2px solid ${t.tileClosedBorder}`;
    shadow="inset 0 2px 4px rgba(0,0,0,0.5)"; opacity=0.5;
  }
  if (isCursed) {
    bg=t.tileCursedBg; color=t.tileCursedText; border=`2px solid ${t.tileCursedBorder}`;
    shadow=`0 0 8px ${t.danger}66`; opacity=0.85;
  }
  if (selected) {
    bg=t.tileSelBg; color=t.tileSelText; border=`2px solid ${t.tileSelBorder}`;
    shadow=t.tileSelShadow; opacity=1;
  } else if (selectable && !isClosed && !isCursed) {
    shadow=`0 3px 10px ${t.accent}44`;
  }

  return (
    <div onClick={()=>selectable&&onClick(number)} style={{
      width:46, height:54, display:"flex", alignItems:"center", justifyContent:"center",
      background:bg, border, borderRadius:8, cursor:selectable?"pointer":"default",
      boxShadow:shadow, opacity, transition:"all 0.18s", position:"relative", userSelect:"none",
    }}>
      {!isClosed && (
        <span style={{fontFamily:"'Georgia',serif",fontWeight:"bold",fontSize:number>=10?15:19,color,lineHeight:1}}>
          {number}
        </span>
      )}
      {isCursed && <span style={{fontSize:16,position:"absolute",top:2,right:2}}>💀</span>}
    </div>
  );
}

function EventFaceTag({ face }) {
  if (!face) return null;
  return (
    <div style={{
      padding:"5px 12px", borderRadius:7,
      background: FACE_COLORS[face]+"22", border:`2px solid ${FACE_COLORS[face]}`,
      color:FACE_COLORS[face], fontFamily:"'Georgia',serif", fontWeight:"bold", fontSize:13,
    }}>{FACE_LABELS[face]}</div>
  );
}

function DiePickRow({ dice, onPick, choice, showAs, t }) {
  return (
    <div style={{display:"flex",gap:10,justifyContent:"center"}}>
      {[0,1].map(i=>(
        <button key={i} onClick={()=>onPick(i)} style={{
          padding:"9px 18px", borderRadius:8, cursor:"pointer",
          fontFamily:"'Georgia',serif", fontWeight:"bold", fontSize:13,
          background: choice===i ? t.accentDim : t.surface,
          border:`2px solid ${choice===i ? t.accent : t.surfaceBorder}`,
          color: choice===i ? t.textBright : t.textMid,
          transition:"all 0.15s",
        }}>
          Die {i+1}: {dice[i]} → {showAs(i)}
        </button>
      ))}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("setup");
  const [config, setConfig] = useState(null);

  function handleStart(cfg) { setConfig(cfg); setScreen("playing"); }
  function handleMenu()     { setScreen("setup"); setConfig(null); }

  if (screen==="setup") return <SetupScreen onStart={handleStart}/>;
  return <GameScreen config={config} onMenu={handleMenu}/>;
}

// ─── Setup Screen ─────────────────────────────────────────────────────────────

function SetupScreen({ onStart }) {
  const [themeId,     setThemeId]     = useState("classic");
  const [mode,        setMode]        = useState(MODE.SOLO);
  const [numPlayers,  setNumPlayers]  = useState(2);
  const [names,       setNames]       = useState(["","","",""]);
  const [preset,      setPreset]      = useState("full");
  const [custom,      setCustom]      = useState([1,2,3,4,5,6,7,8,9,10,11,12]);

  const t = THEMES[themeId];
  const maxP = mode===MODE.SUDDEN ? 2 : mode===MODE.SOLO ? 1 : 4;
  const actualNum = mode===MODE.SOLO ? 1 : Math.min(Math.max(numPlayers,2), maxP);
  const activeTiles = preset==="custom" ? custom : BOARD_PRESETS[preset].tiles;

  function toggleCustom(n) {
    setCustom(prev => prev.includes(n)
      ? (prev.length<=6 ? prev : prev.filter(x=>x!==n))
      : [...prev,n].sort((a,b)=>a-b));
  }
  function updateName(i,v) { const n=[...names]; n[i]=v; setNames(n); }
  function handleStart() {
    const players = Array.from({length:actualNum},(_,i)=>names[i].trim()||(mode===MODE.SOLO?"You":`Player ${i+1}`));
    onStart({themeId,mode,players,activeTiles});
  }

  const MODES = [
    {id:MODE.SOLO,    label:"Solo",         desc:"Play alone. Close all tiles for a perfect score."},
    {id:MODE.LOWEST,  label:"Lowest Score", desc:"Each player gets their own board. Pass when ready. Fewest open tiles wins."},
    {id:MODE.SUDDEN,  label:"Sudden Death", desc:"Share one board. Player who gets stuck is eliminated."},
  ];

  return (
    <div style={{
      minHeight:"100dvh", background:t.bgGrad, overflowY:"auto",
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", padding:"24px 16px 40px",
      fontFamily:"'Georgia',serif",
    }}>
      <style>{`@keyframes cIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>

      {/* Title */}
      <div style={{textAlign:"center",marginBottom:24,animation:"cIn 0.4s ease"}}>
        <div style={{fontSize:11,letterSpacing:4,color:t.textMid,textTransform:"uppercase",marginBottom:6}}>Dice Game</div>
        <h1 style={{margin:0,fontSize:38,fontWeight:"bold",color:t.titleColor,textShadow:"0 2px 12px rgba(0,0,0,0.7)"}}>
          Flip the Box
        </h1>
        <div style={{width:80,height:2,background:`linear-gradient(90deg,transparent,${t.accent},transparent)`,margin:"10px auto 0"}}/>
      </div>

      <div style={{width:"100%",maxWidth:420,display:"flex",flexDirection:"column",gap:16}}>

        {/* Theme */}
        <Section label="Theme" t={t}>
          <div style={{display:"flex",gap:8}}>
            {Object.entries(THEMES).map(([id,th])=>(
              <div key={id} onClick={()=>setThemeId(id)} style={{
                flex:1, padding:"10px 8px", borderRadius:10, cursor:"pointer", textAlign:"center",
                background: themeId===id ? th.accentDim : t.surface,
                border:`2px solid ${themeId===id ? th.accent : t.surfaceBorder}`,
                boxShadow: themeId===id ? `0 0 10px ${th.accent}44` : "none",
                transition:"all 0.15s",
              }}>
                <div style={{width:18,height:18,borderRadius:4,background:th.bgGrad,border:`2px solid ${th.accent}`,margin:"0 auto 5px",boxShadow:`0 0 6px ${th.accent}66`}}/>
                <div style={{color:themeId===id?th.accent:t.textMid,fontWeight:"bold",fontSize:12}}>{th.label}</div>
                <div style={{color:t.textDim,fontSize:10,marginTop:1}}>{th.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* Mode */}
        <Section label="Game Mode" t={t}>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {MODES.map(({id,label,desc})=>(
              <div key={id} onClick={()=>{setMode(id);if(id===MODE.SUDDEN)setNumPlayers(2);if(id===MODE.SOLO)setNumPlayers(1);}} style={{
                padding:"11px 13px", borderRadius:10, cursor:"pointer",
                background: mode===id ? t.accentDim : t.surface,
                border:`2px solid ${mode===id ? t.accent : t.surfaceBorder}`,
                display:"flex", alignItems:"flex-start", gap:10, transition:"all 0.15s",
              }}>
                <div style={{
                  width:15,height:15,borderRadius:"50%",flexShrink:0,marginTop:2,
                  border:`2px solid ${mode===id?t.accent:t.textDim}`,
                  background:mode===id?t.accent:"transparent",transition:"all 0.15s",
                }}/>
                <div>
                  <div style={{color:mode===id?t.textBright:t.textMid,fontWeight:"bold",fontSize:14,marginBottom:2}}>{label}</div>
                  <div style={{color:t.textDim,fontSize:12,lineHeight:1.4}}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Players */}
        {mode!==MODE.SOLO && (
          <Section label={`Players ${mode===MODE.SUDDEN?"(2)":"(2–4)"}`} t={t}>
            <div style={{display:"flex",gap:8}}>
              {Array.from({length:maxP-1},(_,i)=>i+2).map(n=>(
                <div key={n} onClick={()=>setNumPlayers(n)} style={{
                  width:44,height:44,borderRadius:8,
                  cursor:mode===MODE.SUDDEN?"default":"pointer",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  background:actualNum===n?t.accentDim:t.surface,
                  border:`2px solid ${actualNum===n?t.accent:t.surfaceBorder}`,
                  color:actualNum===n?t.textBright:t.textMid,
                  fontWeight:"bold",fontSize:18,transition:"all 0.15s",
                }}>{n}</div>
              ))}
            </div>
          </Section>
        )}

        {/* Names */}
        <Section label={mode===MODE.SOLO?"Your Name":"Player Names"} t={t}>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {Array.from({length:actualNum},(_,i)=>(
              <input key={i} type="text"
                placeholder={mode===MODE.SOLO?"Your name":`Player ${i+1}`}
                value={names[i]} onChange={e=>updateName(i,e.target.value)} maxLength={16}
                style={{
                  padding:"9px 13px", background:"rgba(0,0,0,0.25)",
                  border:`1px solid ${t.textDim}`, borderRadius:8,
                  color:t.textBright, fontFamily:"'Georgia',serif", fontSize:15,
                  outline:"none", width:"100%", boxSizing:"border-box",
                }}
              />
            ))}
          </div>
        </Section>

        {/* Board */}
        <Section label="Board Setup" t={t}>
          <div style={{display:"flex",gap:8,marginBottom:10}}>
            {Object.entries(BOARD_PRESETS).map(([id,{label,desc}])=>(
              <div key={id} onClick={()=>setPreset(id)} style={{
                flex:1,padding:"9px 7px",borderRadius:8,cursor:"pointer",textAlign:"center",
                background:preset===id?t.accentDim:t.surface,
                border:`2px solid ${preset===id?t.accent:t.surfaceBorder}`,
                transition:"all 0.15s",
              }}>
                <div style={{color:preset===id?t.textBright:t.textMid,fontWeight:"bold",fontSize:12}}>{label}</div>
                <div style={{color:t.textDim,fontSize:10,marginTop:2}}>{desc}</div>
              </div>
            ))}
          </div>
          {preset==="custom" ? (
            <div>
              <div style={{fontSize:11,color:t.textMid,marginBottom:7}}>
                Tap to toggle — min 6 ({custom.length} selected)
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {Array.from({length:12},(_,i)=>i+1).map(n=>{
                  const on=custom.includes(n);
                  return (
                    <div key={n} onClick={()=>toggleCustom(n)} style={{
                      width:38,height:44,borderRadius:6,cursor:"pointer",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      background:on?t.tileBg:t.surface,
                      border:`2px solid ${on?t.tileBorder:t.surfaceBorder}`,
                      color:on?t.tileText:t.textDim,
                      fontFamily:"'Georgia',serif",fontWeight:"bold",fontSize:15,
                      opacity:!on&&custom.length<=6?0.35:1,
                      transition:"all 0.15s",
                    }}>{n}</div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {BOARD_PRESETS[preset].tiles.map(n=>(
                <div key={n} style={{
                  width:30,height:34,borderRadius:5,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  background:t.tileBg,border:`1.5px solid ${t.tileBorder}`,
                  color:t.tileText,fontFamily:"'Georgia',serif",fontWeight:"bold",fontSize:13,
                  boxShadow:"0 1px 4px rgba(0,0,0,0.3)",
                }}>{n}</div>
              ))}
            </div>
          )}
        </Section>

        <Btn onClick={handleStart} variant="gold" t={t}>Start Game →</Btn>
      </div>
    </div>
  );
}

function Section({ label, children, t }) {
  return (
    <div style={{
      background:t.surface, border:`1px solid ${t.surfaceBorder}`,
      borderRadius:12, padding:"14px 16px",
    }}>
      <div style={{fontSize:10,letterSpacing:2,color:t.textMid,textTransform:"uppercase",marginBottom:10,fontWeight:"bold"}}>{label}</div>
      {children}
    </div>
  );
}

// ─── Game Screen ──────────────────────────────────────────────────────────────

function GameScreen({ config, onMenu }) {
  const { themeId, mode, players, activeTiles } = config;
  const t = THEMES[themeId] || THEMES.classic;
  const isSolo   = mode===MODE.SOLO;
  const isLowest = mode===MODE.LOWEST || isSolo;

  const mkBoards  = () => players.map(()=>initialTiles(activeTiles));
  const mkShared  = () => initialTiles(activeTiles);

  const [playerBoards,  setPlayerBoards]  = useState(mkBoards);
  const [sharedBoard,   setSharedBoard]   = useState(mkShared);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [eliminated,    setEliminated]    = useState([]);
  const [playersDone,   setPlayersDone]   = useState([]);
  const [phase,         setPhase]         = useState(PHASE.IDLE);
  const [rolling,       setRolling]       = useState(false);
  const [eventFace,     setEventFace]     = useState(null);
  const [effectiveDice, setEffectiveDice] = useState([null,null]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [log,           setLog]           = useState([]);
  const [gameOver,      setGameOver]      = useState(false);
  const [gameOverData,  setGameOverData]  = useState(null);
  const [eventDieUsed,  setEventDieUsed]  = useState(false);
  const [pendingEffect, setPendingEffect] = useState(null);
  const [wildValue,     setWildValue]     = useState("");
  const [hasRolledOnce, setHasRolledOnce] = useState(false);
  const [passConfirm,   setPassConfirm]   = useState(false);
  const [bustSelected,  setBustSelected]  = useState(null);
  const [flipSelected,  setFlipSelected]  = useState(null);
  const [dieChoice,     setDieChoice]     = useState(null);

  const tilesRef = React.useRef(isLowest ? playerBoards[currentPlayer] : sharedBoard);
  useEffect(()=>{ tilesRef.current = isLowest ? playerBoards[currentPlayer] : sharedBoard; },
    [playerBoards,sharedBoard,currentPlayer,isLowest]);

  const addLog = msg => setLog(l=>[`${players[currentPlayer]}: ${msg}`,...l]);
  const curTiles = isLowest ? playerBoards[currentPlayer] : sharedBoard;

  function setCurTiles(nt) {
    if (isLowest) setPlayerBoards(prev=>prev.map((b,i)=>i===currentPlayer?nt:b));
    else setSharedBoard(nt);
  }

  function getTotal(d) { return (d[0]||0)+(d[1]||0); }

  function resetTurn() {
    setEffectiveDice([null,null]); setEventFace(null); setEventDieUsed(false);
    setSelectedTiles([]); setPendingEffect(null); setWildValue("");
    setBustSelected(null); setFlipSelected(null); setDieChoice(null);
  }

  // ── Pass / next ────────────────────────────────────────────────────────────
  function passOrNext() {
    if (isLowest) {
      const nowDone = [...playersDone, currentPlayer];
      setPlayersDone(nowDone); resetTurn(); setHasRolledOnce(false); setPhase(PHASE.IDLE);
      const active = players.map((_,i)=>i).filter(i=>!nowDone.includes(i));
      if (active.length===0) { endLowest(nowDone); }
      else { setCurrentPlayer(active[0]); setPassConfirm(true); }
    } else {
      const active = players.map((_,i)=>i).filter(i=>!eliminated.includes(i));
      const idx = active.indexOf(currentPlayer);
      setCurrentPlayer(active[(idx+1)%active.length]);
      resetTurn(); setHasRolledOnce(false); setPhase(PHASE.IDLE); setPassConfirm(true);
    }
  }

  function endLowest(doneList) {
    const scores = players.map((name,i)=>({name,score:calcScore(playerBoards[i])}));
    const best = Math.min(...scores.map(s=>s.score));
    const winners = scores.filter(s=>s.score===best).map(s=>s.name);
    setGameOverData({scores,winners,mode:MODE.LOWEST});
    setGameOver(true); setPhase(PHASE.GAME_OVER);
  }

  function endSolo(tiles, perfect) {
    setGameOverData({score:calcScore(tiles),perfect,mode:MODE.SOLO});
    setGameOver(true); setPhase(PHASE.GAME_OVER);
  }

  function eliminate() {
    const nowElim=[...eliminated,currentPlayer];
    setEliminated(nowElim);
    addLog(`${players[currentPlayer]} is eliminated!`);
    const active=players.map((_,i)=>i).filter(i=>!nowElim.includes(i));
    if (active.length<=1) {
      setGameOverData({winner:active.length===1?players[active[0]]:null,mode:MODE.SUDDEN});
      setGameOver(true); setPhase(PHASE.GAME_OVER);
    } else {
      setCurrentPlayer(active[0]); resetTurn(); setHasRolledOnce(false);
      setPhase(PHASE.IDLE); setPassConfirm(true);
    }
  }

  // ── Roll ───────────────────────────────────────────────────────────────────
  function rollDice() {
    setRolling(true);
    setTimeout(()=>{
      const d=[rollD6(),rollD6()];
      setEffectiveDice(d); setEventFace(null); setEventDieUsed(false);
      setSelectedTiles([]); setPendingEffect(null); setWildValue("");
      setRolling(false); setHasRolledOnce(true);
      addLog(`Rolled ${d[0]} + ${d[1]} = ${d[0]+d[1]}`);
      setPhase(PHASE.ROLLED);
    },380);
  }

  // ── Event die ──────────────────────────────────────────────────────────────
  function rollEvent(type) {
    const faces = type==="safe" ? SAFE_DIE_FACES : RISK_DIE_FACES;
    const face = faces[Math.floor(Math.random()*faces.length)];
    setEventFace(face); setEventDieUsed(true);
    addLog(`${type==="safe"?"Safe":"Risk"} Die → ${FACE_LABELS[face]}`);
    switch(face) {
      case "blank": setPhase(PHASE.ROLLED); break;
      case "+1": setPendingEffect({type:"+1"}); setPhase(PHASE.EVENT_ROLLED); break;
      case "+2": setPendingEffect({type:"+2"}); setPhase(PHASE.EVENT_ROLLED); break;
      case "wild": setPendingEffect({type:"wild"}); setPhase(PHASE.EVENT_ROLLED); break;
      case "flip": setPendingEffect({type:"flip"}); setPhase(PHASE.FLIP_PICK); break;
      case "+3": {
        const nd=[effectiveDice[0]+3,effectiveDice[1]];
        setEffectiveDice(nd); addLog(`Total boosted by 3 → ${nd[0]+nd[1]}`); setPhase(PHASE.ROLLED); break;
      }
      case "x2": setPendingEffect({type:"x2"}); setPhase(PHASE.EVENT_ROLLED); break;
      case "bust": setPendingEffect({type:"bust"}); setPhase(PHASE.BUST_PICK); break;
      default: setPhase(PHASE.ROLLED);
    }
  }

  function applyMod(mod) {
    return idx => {
      const nd=[...effectiveDice]; nd[idx]+=mod; setEffectiveDice(nd);
      addLog(`Die ${idx+1} → ${nd[idx]}, total = ${nd[0]+nd[1]}`);
      setPendingEffect(null); setPhase(PHASE.ROLLED);
    };
  }

  function applyWild() {
    const v=parseInt(wildValue); if(isNaN(v)||v<1||v>6) return;
    setPendingEffect({type:"wild_pick",value:v}); setDieChoice(null);
    addLog(`Wild ${v} — pick which die to replace`);
  }

  function applyWildToDie(idx) {
    const v=pendingEffect.value; const nd=[...effectiveDice]; nd[idx]=v;
    setEffectiveDice(nd); addLog(`Die ${idx+1} → ${v}, total = ${nd[0]+nd[1]}`);
    setPendingEffect(null); setWildValue(""); setPhase(PHASE.ROLLED);
  }

  function applyX2(idx) {
    const nd=[...effectiveDice]; nd[idx]*=2; setEffectiveDice(nd);
    addLog(`Die ${idx+1} doubled → ${nd[idx]}, total = ${nd[0]+nd[1]}`);
    setPendingEffect(null); setPhase(PHASE.ROLLED);
  }

  function confirmFlip() {
    if (flipSelected===null) return;
    const s=curTiles[flipSelected]; if(s==="cursed") return;
    const ns=s==="open"?"closed":"open";
    const nt={...curTiles,[flipSelected]:ns};
    setCurTiles(nt); addLog(`Tile ${flipSelected} flipped → ${ns}`);
    setPendingEffect(null); setFlipSelected(null);
    if (Object.values(nt).every(x=>x==="closed")) { endTurnPerfect(nt); return; }
    setPhase(PHASE.ROLLED);
  }

  function confirmBust() {
    if (bustSelected===null) return;
    const nt={...curTiles,[bustSelected]:"cursed"};
    setCurTiles(nt); addLog(`💀 Tile ${bustSelected} cursed permanently`);
    setPendingEffect(null); setBustSelected(null); setPhase(PHASE.ROLLED);
  }

  function endTurnPerfect(tiles) {
    addLog("🎉 All tiles closed!");
    if (isSolo) endSolo(tiles,true);
    else if (isLowest) passOrNext();
    else { setGameOverData({winner:players[currentPlayer],mode:MODE.SUDDEN,perfect:true}); setGameOver(true); setPhase(PHASE.GAME_OVER); }
  }

  function confirmSelection() {
    const tot=getTotal(effectiveDice);
    const sum=selectedTiles.reduce((a,b)=>a+b,0);
    if (sum!==tot || !selectedTiles.every(n=>curTiles[n]==="open")) return;
    const nt={...curTiles}; selectedTiles.forEach(n=>{nt[n]="closed";});
    setCurTiles(nt); addLog(`Closed: [${[...selectedTiles].sort((a,b)=>a-b).join(", ")}]`);
    setSelectedTiles([]);
    if (Object.values(nt).every(x=>x==="closed")) { endTurnPerfect(nt); return; }
    setPhase(PHASE.IDLE);
  }

  // ── Derived ────────────────────────────────────────────────────────────────
  const total        = getTotal(effectiveDice);
  const selectedSum  = selectedTiles.reduce((a,b)=>a+b,0);
  const selValid     = selectedTiles.length>0 && selectedSum===total;
  const isStuck      = phase===PHASE.ROLLED && !pendingEffect
    && effectiveDice[0]!==null && validCombos(total,curTiles).length===0;

  const flippable = phase===PHASE.FLIP_PICK
    ? Object.entries(curTiles).filter(([,s])=>s!=="cursed").map(([n])=>parseInt(n)) : [];
  const bustable  = phase===PHASE.BUST_PICK
    ? Object.entries(curTiles).filter(([,s])=>s==="open").map(([n])=>parseInt(n)) : [];
  const selectable = phase===PHASE.ROLLED
    ? Object.entries(curTiles).filter(([,s])=>s==="open").map(([n])=>parseInt(n)) : [];

  const clickable = n =>
    (phase===PHASE.FLIP_PICK && flippable.includes(n)) ||
    (phase===PHASE.BUST_PICK && bustable.includes(n))  ||
    (phase===PHASE.ROLLED    && selectable.includes(n));

  const handleTileClick = n => {
    if (phase===PHASE.FLIP_PICK) { if(curTiles[n]!=="cursed") setFlipSelected(n); return; }
    if (phase===PHASE.BUST_PICK) { if(curTiles[n]==="open") setBustSelected(n); return; }
    if (phase===PHASE.ROLLED)    { setSelectedTiles(prev=>prev.includes(n)?prev.filter(x=>x!==n):[...prev,n]); }
  };

  const tileSelected = n =>
    selectedTiles.includes(n) ||
    (phase===PHASE.BUST_PICK && bustSelected===n) ||
    (phase===PHASE.FLIP_PICK && flipSelected===n);

  const openCount   = Object.values(curTiles).filter(s=>s==="open").length;
  const closedCount = Object.values(curTiles).filter(s=>s==="closed").length;
  const cursedCount = Object.values(curTiles).filter(s=>s==="cursed").length;

  function resetAll() {
    setPlayerBoards(mkBoards()); setSharedBoard(mkShared());
    setCurrentPlayer(0); setEliminated([]); setPlayersDone([]);
    setPhase(PHASE.IDLE); resetTurn(); setLog([]);
    setGameOver(false); setGameOverData(null); setHasRolledOnce(false);
  }

  // ── Pass confirm ───────────────────────────────────────────────────────────
  if (passConfirm) {
    return (
      <div style={{minHeight:"100dvh",background:t.bgGrad,display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"'Georgia',serif"}}>
        <style>{`@keyframes cIn{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:none}}`}</style>
        <div style={{background:t.surface,border:`1px solid ${t.accentBorder}`,borderRadius:16,padding:"32px 36px",textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,0.5)",maxWidth:320,animation:"cIn 0.3s ease"}}>
          <div style={{fontSize:12,color:t.textMid,marginBottom:8,letterSpacing:1}}>Next up</div>
          <div style={{fontSize:28,color:t.textBright,fontWeight:"bold",marginBottom:8}}>{players[currentPlayer]}</div>
          <div style={{fontSize:13,color:t.textMid,marginBottom:22}}>Hand the device over, then tap Ready.</div>
          <Btn onClick={()=>setPassConfirm(false)} variant="gold" t={t}>Ready — Let's Go</Btn>
        </div>
      </div>
    );
  }

  // ── Game over ──────────────────────────────────────────────────────────────
  if (gameOver && gameOverData) {
    return (
      <div style={{minHeight:"100dvh",background:t.bgGrad,display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:"'Georgia',serif"}}>
        <style>{`@keyframes cIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`}</style>
        <div style={{background:t.surface,border:`1px solid ${t.accentBorder}`,borderRadius:16,padding:"28px 24px",textAlign:"center",boxShadow:"0 8px 32px rgba(0,0,0,0.5)",maxWidth:400,width:"100%",animation:"cIn 0.4s ease"}}>
          {gameOverData.mode===MODE.SOLO && (
            <>
              <div style={{fontSize:40,marginBottom:8}}>{gameOverData.perfect?"🎉":"🎲"}</div>
              <div style={{color:gameOverData.perfect?t.accent:t.textMid,fontSize:22,fontWeight:"bold",marginBottom:6}}>
                {gameOverData.perfect?"Perfect Game!":"Game Over"}
              </div>
              {!gameOverData.perfect && <>
                <div style={{color:t.textMid,fontSize:13,marginBottom:4}}>Final Score</div>
                <div style={{color:t.accent,fontSize:52,fontWeight:"bold",lineHeight:1,marginBottom:4}}>{gameOverData.score}</div>
                <div style={{color:t.textDim,fontSize:12,marginBottom:16}}>lower is better</div>
              </>}
              {gameOverData.perfect && <div style={{color:t.textMid,fontSize:14,marginBottom:16}}>All tiles closed!</div>}
            </>
          )}
          {gameOverData.mode===MODE.SUDDEN && (
            <>
              <div style={{fontSize:40,marginBottom:8}}>{gameOverData.perfect?"🎉":"👑"}</div>
              <div style={{color:t.accent,fontSize:26,fontWeight:"bold",marginBottom:gameOverData.perfect?6:18}}>
                {gameOverData.winner?`${gameOverData.winner} wins!`:"Draw!"}
              </div>
              {gameOverData.perfect && <div style={{color:t.textMid,fontSize:14,marginBottom:16}}>Perfect clear!</div>}
            </>
          )}
          {gameOverData.mode===MODE.LOWEST && (
            <>
              <div style={{fontSize:40,marginBottom:8}}>🏆</div>
              <div style={{color:t.accent,fontSize:22,fontWeight:"bold",marginBottom:14}}>
                {gameOverData.winners.length===1?`${gameOverData.winners[0]} wins!`:`Tie: ${gameOverData.winners.join(" & ")}!`}
              </div>
              <div style={{marginBottom:18}}>
                {[...gameOverData.scores].sort((a,b)=>a.score-b.score).map((s,i)=>(
                  <div key={i} style={{
                    display:"flex",justifyContent:"space-between",alignItems:"center",
                    padding:"7px 12px",marginBottom:5,
                    background:s.score===Math.min(...gameOverData.scores.map(x=>x.score))?t.accentDim:"rgba(255,255,255,0.03)",
                    borderRadius:8,border:`1px solid ${t.surfaceBorder}`,
                  }}>
                    <span style={{color:t.textMid,fontSize:14}}>{s.name}</span>
                    <span style={{color:t.accent,fontWeight:"bold",fontSize:18}}>{s.score}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          <div style={{display:"flex",gap:10,justifyContent:"center"}}>
            <Btn onClick={()=>{ resetAll(); if(!isSolo) setPassConfirm(true); }} variant="gold" t={t}>Play Again</Btn>
            <Btn onClick={onMenu} variant="green" t={t}>Menu</Btn>
          </div>
        </div>
      </div>
    );
  }

  // ── Main game UI ───────────────────────────────────────────────────────────
  return (
    <div style={{
      height:"100dvh", background:t.bgGrad, overflow:"hidden",
      display:"flex", flexDirection:"column", fontFamily:"'Georgia',serif",
    }}>
      <style>{`@keyframes dieSpin{0%{transform:rotate(0deg) scale(1)}40%{transform:rotate(180deg) scale(1.15)}100%{transform:rotate(360deg) scale(1)}}`}</style>

      {/* ── Header ── */}
      <div style={{
        flexShrink:0, padding:"12px 16px 0",
        display:"flex", alignItems:"center", justifyContent:"center",
        position:"relative",
      }}>
        <button onClick={onMenu} style={{
          position:"absolute", left:16,
          background:t.surface, border:`1px solid ${t.surfaceBorder}`,
          borderRadius:8, padding:"5px 11px",
          color:t.textMid, fontFamily:"'Georgia',serif", fontSize:12, cursor:"pointer",
        }}>← Menu</button>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:22,fontWeight:"bold",color:t.titleColor,letterSpacing:0.5}}>Flip the Box</div>
          <div style={{fontSize:10,color:t.textDim,letterSpacing:2,textTransform:"uppercase"}}>
            {isSolo?"Solo":isLowest?"Lowest Score":"Sudden Death"}
          </div>
        </div>
      </div>

      {/* ── Player chips ── */}
      {(!isSolo) && (
        <div style={{flexShrink:0,display:"flex",gap:6,justifyContent:"center",padding:"8px 16px 0",flexWrap:"wrap"}}>
          {players.map((name,i)=>{
            const done  = isLowest && playersDone.includes(i);
            const elim  = !isLowest && eliminated.includes(i);
            const active= i===currentPlayer;
            return (
              <div key={i} style={{
                padding:"4px 12px",borderRadius:20,fontSize:11,
                background:active?t.accentDim:t.surface,
                border:`1.5px solid ${elim?t.danger:active?t.accent:t.surfaceBorder}`,
                color:elim?t.danger:done?t.textDim:active?t.textBright:t.textMid,
                fontWeight:active?"bold":"normal",
                textDecoration:(done||elim)?"line-through":"none",
              }}>
                {name}{done?` (${calcScore(playerBoards[i])})` : ""}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Scroll field ── */}
      <div style={{flex:1,overflowY:"auto",padding:"10px 14px 0"}}>

        {/* Stats */}
        <div style={{
          display:"flex",justifyContent:"space-between",
          background:t.statBg,border:`1px solid ${t.statBorder}`,
          borderRadius:8,padding:"6px 12px",marginBottom:10,
          fontSize:11,color:t.textMid,letterSpacing:1,textTransform:"uppercase",
        }}>
          <span>Open <b style={{color:t.textBright}}>{openCount}</b></span>
          <span>Closed <b style={{color:t.textMid}}>{closedCount}</b></span>
          {cursedCount>0&&<span>Cursed <b style={{color:t.danger}}>{cursedCount}</b></span>}
          {total>0&&phase!==PHASE.IDLE&&<span>Target <b style={{color:t.accent}}>{total}</b></span>}
        </div>

        {/* Current player banner */}
        {!isSolo&&(
          <div style={{textAlign:"center",marginBottom:8,fontSize:14,color:t.textBright,fontWeight:"bold"}}>
            {players[currentPlayer]}'s turn
          </div>
        )}

        {/* Tiles */}
        <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",marginBottom:12}}>
          {activeTiles.map(n=>(
            <TileEl key={n} number={n} state={curTiles[n]}
              onClick={handleTileClick} selectable={clickable(n)} selected={tileSelected(n)} t={t}/>
          ))}
        </div>

        {/* Dice row */}
        {phase!==PHASE.IDLE&&(
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:10}}>
            <Die value={effectiveDice[0]} rolling={rolling} t={t}/>
            <span style={{color:t.textMid,fontSize:20}}>+</span>
            <Die value={effectiveDice[1]} rolling={rolling} t={t}/>
            <span style={{color:t.accent,fontSize:20,fontWeight:"bold"}}>= {total}</span>
            {eventFace&&<EventFaceTag face={eventFace}/>}
          </div>
        )}

        {/* Instructions */}
        <div style={{textAlign:"center",minHeight:32,marginBottom:8,fontSize:13,color:t.textMid,lineHeight:1.5}}>
          {phase===PHASE.IDLE&&"Roll the dice to begin your turn."}
          {phase===PHASE.ROLLED&&!pendingEffect&&!isStuck&&`Select tiles summing to ${total}, then confirm.`}
          {phase===PHASE.ROLLED&&!pendingEffect&&isStuck&&<span style={{color:t.danger}}>No valid combos for {total}. Try an event die or give up.</span>}
          {phase===PHASE.FLIP_PICK&&"Select any tile to flip, then confirm."}
          {phase===PHASE.BUST_PICK&&<span style={{color:t.danger}}>💀 Bust! Pick a tile to curse, then confirm.</span>}
          {phase===PHASE.EVENT_ROLLED&&pendingEffect?.type==="+1"&&"Pick which die to add +1 to:"}
          {phase===PHASE.EVENT_ROLLED&&pendingEffect?.type==="+2"&&"Pick which die to add +2 to:"}
          {phase===PHASE.EVENT_ROLLED&&pendingEffect?.type==="wild"&&"Enter a value (1–6):"}
          {phase===PHASE.EVENT_ROLLED&&pendingEffect?.type==="wild_pick"&&"Pick which die to replace:"}
          {phase===PHASE.EVENT_ROLLED&&pendingEffect?.type==="x2"&&"Pick which die to double:"}
        </div>

        {/* Flip confirm */}
        {phase===PHASE.FLIP_PICK&&(
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:10}}>
            <Btn onClick={confirmFlip} disabled={flipSelected===null} variant="gold" t={t}>
              {flipSelected!==null
                ?`⇅ Confirm flip tile ${flipSelected} (${curTiles[flipSelected]==="open"?"open→closed":"closed→open"})`
                :"⇅ Select a tile"}
            </Btn>
            {flipSelected!==null&&<Btn onClick={()=>setFlipSelected(null)} variant="green" t={t}>↩ Change</Btn>}
          </div>
        )}

        {/* Bust confirm */}
        {phase===PHASE.BUST_PICK&&(
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:10}}>
            <Btn onClick={confirmBust} disabled={bustSelected===null} variant="red" t={t}>
              {bustSelected!==null?`💀 Confirm curse tile ${bustSelected}`:"💀 Select a tile"}
            </Btn>
            {bustSelected!==null&&<Btn onClick={()=>setBustSelected(null)} variant="green" t={t}>↩ Change</Btn>}
          </div>
        )}

        {/* Event die resolvers */}
        {phase===PHASE.EVENT_ROLLED&&pendingEffect&&(
          <div style={{display:"flex",flexDirection:"column",gap:9,alignItems:"center",marginBottom:10}}>
            {(pendingEffect.type==="+1"||pendingEffect.type==="+2")&&(()=>{
              const mod=pendingEffect.type==="+1"?1:2;
              return(<>
                <DiePickRow dice={effectiveDice} onPick={setDieChoice} choice={dieChoice} showAs={i=>effectiveDice[i]+mod} t={t}/>
                <div style={{display:"flex",gap:8}}>
                  <Btn onClick={()=>{applyMod(mod)(dieChoice);setDieChoice(null);}} disabled={dieChoice===null} variant="gold" t={t}>
                    {dieChoice!==null?`✓ Confirm — Die ${dieChoice+1} → ${effectiveDice[dieChoice]+mod}`:"✓ Select a die"}
                  </Btn>
                  {dieChoice!==null&&<Btn onClick={()=>setDieChoice(null)} variant="green" t={t}>↩</Btn>}
                </div>
              </>);
            })()}
            {pendingEffect.type==="wild"&&(
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <input type="number" min={1} max={6} value={wildValue} onChange={e=>setWildValue(e.target.value)}
                  style={{width:54,padding:"8px 10px",background:"rgba(0,0,0,0.3)",border:`1px solid ${t.textDim}`,
                    borderRadius:6,color:t.textBright,fontFamily:"'Georgia',serif",fontSize:16,textAlign:"center"}}/>
                <Btn onClick={applyWild} variant="gold" disabled={!wildValue||parseInt(wildValue)<1||parseInt(wildValue)>6} t={t}>Set Wild</Btn>
              </div>
            )}
            {pendingEffect.type==="wild_pick"&&(()=>{
              const v=pendingEffect.value;
              return(<>
                <DiePickRow dice={effectiveDice} onPick={setDieChoice} choice={dieChoice} showAs={()=>v} t={t}/>
                <div style={{display:"flex",gap:8}}>
                  <Btn onClick={()=>{applyWildToDie(dieChoice);setDieChoice(null);}} disabled={dieChoice===null} variant="gold" t={t}>
                    {dieChoice!==null?`✓ Confirm — Die ${dieChoice+1} → ${v}`:"✓ Select a die"}
                  </Btn>
                  {dieChoice!==null&&<Btn onClick={()=>setDieChoice(null)} variant="green" t={t}>↩</Btn>}
                </div>
              </>);
            })()}
            {pendingEffect.type==="x2"&&(()=>{
              return(<>
                <DiePickRow dice={effectiveDice} onPick={setDieChoice} choice={dieChoice} showAs={i=>effectiveDice[i]*2} t={t}/>
                <div style={{display:"flex",gap:8}}>
                  <Btn onClick={()=>{applyX2(dieChoice);setDieChoice(null);}} disabled={dieChoice===null} variant="gold" t={t}>
                    {dieChoice!==null?`✓ Confirm — Die ${dieChoice+1} → ${effectiveDice[dieChoice]*2}`:"✓ Select a die"}
                  </Btn>
                  {dieChoice!==null&&<Btn onClick={()=>setDieChoice(null)} variant="green" t={t}>↩</Btn>}
                </div>
              </>);
            })()}
          </div>
        )}

        {/* Action buttons */}
        <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:10}}>
          {phase===PHASE.IDLE&&<Btn onClick={rollDice} disabled={rolling} variant="gold" t={t}>🎲 Roll Dice</Btn>}
          {phase===PHASE.ROLLED&&!pendingEffect&&(<>
            {!eventDieUsed&&(<>
              <Btn onClick={()=>rollEvent("safe")} variant="green" t={t}>🛡 Safe Die</Btn>
              <Btn onClick={()=>rollEvent("risk")} variant="red" t={t}>⚡ Risk Die</Btn>
            </>)}
            <Btn onClick={confirmSelection} disabled={!selValid} variant="gold" t={t}>
              ✓ Confirm ({selectedSum}/{total})
            </Btn>
            {isStuck&&(
              <Btn
                onClick={()=>{
                  if(eventDieUsed){
                    if(isSolo) endSolo(curTiles,false);
                    else if(isLowest){addLog("Stuck — turn ends.");passOrNext();}
                    else eliminate();
                  } else {
                    addLog(`Gave up — no combo for ${total}`);
                    if(isSolo) setPhase(PHASE.IDLE);
                    else passOrNext();
                  }
                }}
                variant={eventDieUsed?"red":"green"} t={t}
              >
                {eventDieUsed?(isSolo?"✗ End Game":isLowest?"✗ End Turn":"✗ Eliminated"):"↩ Give Up Turn"}
              </Btn>
            )}
          </>)}
          {!isSolo&&phase===PHASE.IDLE&&hasRolledOnce&&(
            <Btn onClick={passOrNext} variant="green" t={t}>➤ Pass to Next Player</Btn>
          )}
        </div>

        {/* Log */}
        <GameLog entries={log} t={t}/>

        {/* Legend */}
        <div style={{marginTop:8,display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",fontSize:10,color:t.textDim}}>
          <span>● selectable</span><span>■ closed</span><span>💀 cursed</span>
        </div>

        {/* Dice reference */}
        <div style={{marginTop:10,display:"flex",gap:8}}>
          {[{name:"Safe Die",faces:SAFE_DIE_FACES,border:t.safePanelBorder,label:t.safeLabel},
            {name:"Risk Die",faces:RISK_DIE_FACES,border:t.riskPanelBorder,label:t.riskLabel}]
            .map(({name,faces,border,label})=>(
            <div key={name} style={{flex:1,background:t.surface,border:`1px solid ${border}`,borderRadius:8,padding:"8px 10px"}}>
              <div style={{fontSize:9,letterSpacing:2,color:label,textTransform:"uppercase",marginBottom:5,fontWeight:"bold"}}>{name}</div>
              {faces.map((f,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:5,marginBottom:2,fontSize:11,color:t.textMid}}>
                  <span style={{width:12,height:12,borderRadius:3,background:FACE_COLORS[f]+"33",border:`1px solid ${FACE_COLORS[f]}88`,
                    display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:7,color:FACE_COLORS[f],flexShrink:0}}>●</span>
                  {FACE_LABELS[f]}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{height:20}}/>
      </div>
    </div>
  );
}
