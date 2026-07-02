import React, { useState, useEffect } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────
const TOTAL_TILES = 12;
const SAFE_DIE_FACES = ["blank", "blank", "blank", "+1", "+2", "wild"];
const RISK_DIE_FACES = ["wild", "wild", "flip", "x2", "+3", "bust"];

const FACE_LABELS = {
  blank: "—",
  "+1": "+1",
  "+2": "+2",
  "+3": "+3",
  wild: "★ Wild",
  flip: "⇅ Flip",
  x2: "×2",
  bust: "💀 Bust",
};

const FACE_COLORS = {
  blank: "#8aab8a",
  "+1": "#c8b560",
  "+2": "#c8b560",
  "+3": "#e07840",
  wild: "#7bafd4",
  flip: "#b07fc8",
  x2: "#e07840",
  bust: "#c84040",
};

function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

function rollEventDie(faces) {
  return faces[Math.floor(Math.random() * faces.length)];
}

function getDotPositions(n) {
  const positions = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [75, 25], [25, 75], [75, 75]],
    5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
    6: [[25, 22], [75, 22], [25, 50], [75, 50], [25, 78], [75, 78]],
  };
  return positions[n] || [];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Die({ value, rolling }) {
  const dots = getDotPositions(value || 1);
  return (
    <div style={{
      width: 64, height: 64,
      background: rolling ? "#f0e8d0" : "#fdf6e3",
      border: "3px solid #8b6914",
      borderRadius: 12,
      boxShadow: rolling
        ? "0 0 0 3px #c8a832, 0 4px 16px rgba(0,0,0,0.4)"
        : "inset 0 2px 4px rgba(255,255,255,0.6), 0 4px 8px rgba(0,0,0,0.35)",
      position: "relative",
      flexShrink: 0,
      transition: "box-shadow 0.15s",
      animation: rolling ? "dieSpin 0.35s ease-out" : "none",
    }}>
      {dots.map(([x, y], i) => (
        <div key={i} style={{
          position: "absolute",
          width: 10, height: 10,
          borderRadius: "50%",
          background: "#2a1a00",
          left: `calc(${x}% - 5px)`,
          top: `calc(${y}% - 5px)`,
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3)",
        }} />
      ))}
    </div>
  );
}

function EventDieFace({ face }) {
  if (!face) return null;
  return (
    <div style={{
      padding: "6px 14px",
      borderRadius: 8,
      background: FACE_COLORS[face] + "33",
      border: `2px solid ${FACE_COLORS[face]}`,
      color: FACE_COLORS[face],
      fontFamily: "'Georgia', serif",
      fontWeight: "bold",
      fontSize: 15,
      letterSpacing: 0.5,
    }}>
      {FACE_LABELS[face]}
    </div>
  );
}

function Tile({ number, state, onClick, selectable, selected }) {
  const isClosed = state === "closed";
  const isCursed = state === "cursed";
  const isOpen = state === "open";

  let bg = "#fdf6e3";
  let color = "#2a1a00";
  let border = "2px solid #8b6914";
  let opacity = 1;
  let cursor = selectable ? "pointer" : "default";
  let boxShadow = "0 3px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.5)";

  if (isClosed) {
    bg = "#3a5c3a";
    color = "#3a5c3a";
    border = "2px solid #2a4c2a";
    boxShadow = "inset 0 2px 4px rgba(0,0,0,0.4)";
    opacity = 0.55;
  }
  if (isCursed) {
    bg = "#4a1a1a";
    color = "#c84040";
    border = "2px solid #c84040";
    boxShadow = "0 0 8px #c8404088, inset 0 2px 4px rgba(0,0,0,0.5)";
    opacity = 0.85;
  }
  if (selected) {
    bg = "#f5c518";
    color = "#1a0f00";
    border = "2px solid #a07800";
    boxShadow = "0 0 0 3px #f5c51888, 0 4px 12px rgba(245,197,24,0.5)";
    opacity = 1;
  }
  if (selectable && !isClosed && !isCursed && !selected) {
    bg = "#fffbe8";
    boxShadow = "0 3px 10px rgba(200,168,50,0.4), inset 0 1px 2px rgba(255,255,255,0.6)";
  }

  return (
    <div
      onClick={() => selectable && onClick(number)}
      style={{
        width: 48, height: 56,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: bg,
        border,
        borderRadius: 8,
        cursor,
        boxShadow,
        opacity,
        transition: "all 0.2s",
        position: "relative",
        userSelect: "none",
      }}
    >
      {!isClosed && (
        <span style={{
          fontFamily: "'Georgia', serif",
          fontWeight: "bold",
          fontSize: number >= 10 ? 16 : 20,
          color,
          lineHeight: 1,
        }}>
          {number}
        </span>
      )}
      {isCursed && (
        <span style={{ fontSize: 18, position: "absolute", top: 2, right: 3 }}>💀</span>
      )}
    </div>
  );
}

function Button({ onClick, disabled, children, variant = "primary" }) {
  const styles = {
    primary: {
      background: disabled ? "#4a5c4a" : "linear-gradient(180deg, #5a8a5a 0%, #3a6a3a 100%)",
      color: disabled ? "#6a7a6a" : "#e8f4e8",
      border: "2px solid " + (disabled ? "#3a4a3a" : "#2a5a2a"),
    },
    gold: {
      background: disabled ? "#4a4030" : "linear-gradient(180deg, #d4a830 0%, #a07820 100%)",
      color: disabled ? "#6a5a40" : "#2a1a00",
      border: "2px solid " + (disabled ? "#3a3020" : "#7a5810"),
    },
    danger: {
      background: disabled ? "#4a3030" : "linear-gradient(180deg, #c84040 0%, #902020 100%)",
      color: disabled ? "#6a4040" : "#ffe8e8",
      border: "2px solid " + (disabled ? "#3a2020" : "#701010"),
    },
  };
  const s = styles[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...s,
        padding: "10px 20px",
        borderRadius: 8,
        fontFamily: "'Georgia', serif",
        fontWeight: "bold",
        fontSize: 14,
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : "0 3px 8px rgba(0,0,0,0.3)",
        transition: "all 0.15s",
        letterSpacing: 0.3,
      }}
    >
      {children}
    </button>
  );
}

function Log({ entries }) {
  return (
    <div style={{
      maxHeight: 120,
      overflowY: "auto",
      background: "#1a2e1a",
      border: "1px solid #2a4a2a",
      borderRadius: 8,
      padding: "8px 12px",
      fontFamily: "monospace",
      fontSize: 12,
      color: "#8ab88a",
      display: "flex",
      flexDirection: "column-reverse",
      gap: 2,
    }}>
      {entries.length === 0
        ? <span style={{ color: "#4a6a4a" }}>Game log will appear here…</span>
        : entries.map((e, i) => <div key={i}>{e}</div>)
      }
    </div>
  );
}


// ─── Main Game ───────────────────────────────────────────────────────────────

const PHASE = {
  IDLE: "idle",
  ROLLED: "rolled",
  EVENT_ROLLED: "event",
  FLIP_PICK: "flip_pick",
  BUST_PICK: "bust_pick",
  GAME_OVER: "game_over",
};

const SCREEN = {
  SETUP: "setup",
  PLAYING: "playing",
};

const MODE = {
  SOLO: "solo",
  LOWEST: "lowest",
  SUDDEN: "sudden",
};

function initialTiles(activeTileNums) {
  const nums = activeTileNums || Array.from({ length: TOTAL_TILES }, (_, i) => i + 1);
  const t = {};
  nums.forEach(n => { t[n] = "open"; });
  return t;
}

function calcScore(tileStates) {
  return Object.entries(tileStates)
    .filter(([, s]) => s !== "closed")
    .reduce((sum, [n]) => sum + parseInt(n), 0);
}

function validCombos(total, tileStates) {
  const openTiles = Object.entries(tileStates)
    .filter(([, s]) => s === "open")
    .map(([n]) => parseInt(n));
  const results = [];
  function bt(remaining, start, chosen) {
    if (remaining === 0) { results.push([...chosen]); return; }
    for (let i = start; i < openTiles.length; i++) {
      if (openTiles[i] <= remaining) {
        chosen.push(openTiles[i]);
        bt(remaining - openTiles[i], i + 1, chosen);
        chosen.pop();
      }
    }
  }
  bt(total, 0, []);
  return results;
}

// ─── Setup Screen ────────────────────────────────────────────────────────────

const BOARD_PRESETS = {
  classic: { label: "Classic", desc: "1–9", tiles: [1,2,3,4,5,6,7,8,9] },
  full:    { label: "Full",    desc: "1–12", tiles: [1,2,3,4,5,6,7,8,9,10,11,12] },
  custom:  { label: "Custom",  desc: "Pick your own", tiles: null },
};

function SetupScreen({ onStart }) {
  const [mode, setMode] = useState(MODE.SOLO);
  const [numPlayers, setNumPlayers] = useState(2);
  const [names, setNames] = useState(["", "", "", ""]);
  const [boardPreset, setBoardPreset] = useState("full");
  const [customTiles, setCustomTiles] = useState([1,2,3,4,5,6,7,8,9,10,11,12]);

  const maxPlayers = mode === MODE.SUDDEN ? 2 : mode === MODE.SOLO ? 1 : 4;
  const minPlayers = mode === MODE.SOLO ? 1 : 2;
  const actualNum = mode === MODE.SOLO ? 1 : Math.min(Math.max(numPlayers, minPlayers), maxPlayers);

  const activeTiles = boardPreset === "custom"
    ? customTiles
    : BOARD_PRESETS[boardPreset].tiles;

  function toggleCustomTile(n) {
    setCustomTiles(prev => {
      if (prev.includes(n)) {
        if (prev.length <= 6) return prev; // minimum 6 tiles
        return prev.filter(t => t !== n);
      }
      return [...prev, n].sort((a, b) => a - b);
    });
  }

  function updateName(i, val) {
    const n = [...names]; n[i] = val; setNames(n);
  }

  function handleStart() {
    const playerNames = Array.from({ length: actualNum }, (_, i) =>
      names[i].trim() || (mode === MODE.SOLO ? "You" : `Player ${i + 1}`)
    );
    onStart({ mode, players: playerNames, activeTiles });
  }

  const MODES = [
    { id: MODE.SOLO,    label: "Solo",         desc: "Play alone. Close all tiles for a perfect score." },
    { id: MODE.LOWEST,  label: "Lowest Score", desc: "Each player gets their own board. Pass when ready. Fewest open tiles wins." },
    { id: MODE.SUDDEN,  label: "Sudden Death", desc: "Share one board. Player who gets stuck is eliminated." },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 30%, #1e4a1e 0%, #0d2a0d 60%, #071507 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "24px 16px",
      fontFamily: "'Georgia', serif",
    }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "#6aaa6a", textTransform: "uppercase", marginBottom: 6 }}>
          Dice Game
        </div>
        <h1 style={{
          margin: 0, fontSize: 38, fontWeight: "bold", color: "#e8d88a",
          textShadow: "0 2px 8px rgba(0,0,0,0.6)",
        }}>Flip the Box</h1>
        <div style={{ width: 80, height: 2, background: "linear-gradient(90deg, transparent, #c8a832, transparent)", margin: "10px auto 0" }} />
      </div>

      <div style={{
        width: "100%", maxWidth: 420,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(200,168,50,0.2)",
        borderRadius: 16, padding: "24px 24px 28px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}>
        {/* Mode */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#6aaa6a", textTransform: "uppercase", marginBottom: 10 }}>Game Mode</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {MODES.map(({ id, label, desc }) => (
              <div
                key={id}
                onClick={() => { setMode(id); if (id === MODE.SUDDEN) setNumPlayers(2); if (id === MODE.SOLO) setNumPlayers(1); }}
                style={{
                  padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                  background: mode === id ? "rgba(200,168,50,0.15)" : "rgba(255,255,255,0.03)",
                  border: `2px solid ${mode === id ? "#c8a832" : "rgba(255,255,255,0.08)"}`,
                  transition: "all 0.15s",
                  display: "flex", alignItems: "flex-start", gap: 10,
                }}
              >
                <div style={{
                  width: 16, height: 16, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                  border: `2px solid ${mode === id ? "#c8a832" : "#3a5a3a"}`,
                  background: mode === id ? "#c8a832" : "transparent",
                  transition: "all 0.15s",
                }} />
                <div>
                  <div style={{ color: mode === id ? "#e8d88a" : "#8aaa8a", fontWeight: "bold", fontSize: 14, marginBottom: 2 }}>{label}</div>
                  <div style={{ color: "#4a6a4a", fontSize: 12, lineHeight: 1.4 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Number of players — hidden for solo */}
        {mode !== MODE.SOLO && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#6aaa6a", textTransform: "uppercase", marginBottom: 10 }}>
              Players {mode === MODE.SUDDEN ? "(2)" : "(2–4)"}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {Array.from({ length: maxPlayers - 1 }, (_, i) => i + 2).map(n => (
                <div
                  key={n}
                  onClick={() => setNumPlayers(n)}
                  style={{
                    width: 44, height: 44, borderRadius: 8, cursor: mode === MODE.SUDDEN ? "default" : "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: actualNum === n ? "rgba(200,168,50,0.2)" : "rgba(255,255,255,0.04)",
                    border: `2px solid ${actualNum === n ? "#c8a832" : "rgba(255,255,255,0.1)"}`,
                    color: actualNum === n ? "#e8d88a" : "#6a8a6a",
                    fontWeight: "bold", fontSize: 18,
                    transition: "all 0.15s",
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Names */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#6aaa6a", textTransform: "uppercase", marginBottom: 10 }}>
            {mode === MODE.SOLO ? "Your Name" : "Player Names"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {Array.from({ length: actualNum }, (_, i) => (
              <input
                key={i}
                type="text"
                placeholder={mode === MODE.SOLO ? "Your name" : `Player ${i + 1}`}
                value={names[i]}
                onChange={e => updateName(i, e.target.value)}
                maxLength={16}
                style={{
                  padding: "10px 14px",
                  background: "#1a2e1a", border: "1px solid #3a5a3a",
                  borderRadius: 8, color: "#e8f4e8",
                  fontFamily: "'Georgia', serif", fontSize: 15,
                  outline: "none", width: "100%", boxSizing: "border-box",
                }}
              />
            ))}
          </div>
        </div>

        {/* Board Setup */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#6aaa6a", textTransform: "uppercase", marginBottom: 10 }}>Board Setup</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {Object.entries(BOARD_PRESETS).map(([id, { label, desc }]) => (
              <div
                key={id}
                onClick={() => setBoardPreset(id)}
                style={{
                  flex: 1, padding: "10px 8px", borderRadius: 8, cursor: "pointer",
                  textAlign: "center",
                  background: boardPreset === id ? "rgba(200,168,50,0.15)" : "rgba(255,255,255,0.03)",
                  border: `2px solid ${boardPreset === id ? "#c8a832" : "rgba(255,255,255,0.08)"}`,
                  transition: "all 0.15s",
                }}
              >
                <div style={{ color: boardPreset === id ? "#e8d88a" : "#8aaa8a", fontWeight: "bold", fontSize: 13 }}>{label}</div>
                <div style={{ color: "#4a6a4a", fontSize: 11, marginTop: 2 }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Custom tile picker */}
          {boardPreset === "custom" && (
            <div>
              <div style={{ fontSize: 11, color: "#6a8a6a", marginBottom: 8 }}>
                Tap to toggle tiles — minimum 6 required ({customTiles.length} selected)
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(n => {
                  const on = customTiles.includes(n);
                  return (
                    <div
                      key={n}
                      onClick={() => toggleCustomTile(n)}
                      style={{
                        width: 40, height: 44, borderRadius: 6, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: on ? "#fdf6e3" : "rgba(255,255,255,0.04)",
                        border: `2px solid ${on ? "#8b6914" : "rgba(255,255,255,0.1)"}`,
                        color: on ? "#2a1a00" : "#3a5a3a",
                        fontFamily: "'Georgia', serif",
                        fontWeight: "bold", fontSize: 16,
                        opacity: !on && customTiles.length <= 6 ? 0.4 : 1,
                        transition: "all 0.15s",
                        boxShadow: on ? "0 2px 6px rgba(0,0,0,0.3)" : "none",
                      }}
                    >
                      {n}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Preview of active tiles for non-custom */}
          {boardPreset !== "custom" && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {BOARD_PRESETS[boardPreset].tiles.map(n => (
                <div key={n} style={{
                  width: 32, height: 36, borderRadius: 5,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#fdf6e3", border: "1.5px solid #8b6914",
                  color: "#2a1a00", fontFamily: "'Georgia', serif",
                  fontWeight: "bold", fontSize: 14,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                }}>{n}</div>
              ))}
            </div>
          )}
        </div>

        <Button onClick={handleStart} variant="gold">
          Start Game
        </Button>
      </div>
    </div>
  );
}

// ─── Game Screen ─────────────────────────────────────────────────────────────

export default function FlipTheBox() {
  const [screen, setScreen] = useState(SCREEN.SETUP);
  const [gameConfig, setGameConfig] = useState(null);

  function handleStart(config) {
    setGameConfig(config);
    setScreen(SCREEN.PLAYING);
  }

  function handleBackToSetup() {
    setScreen(SCREEN.SETUP);
    setGameConfig(null);
  }

  if (screen === SCREEN.SETUP) return <SetupScreen onStart={handleStart} />;
  return <GameScreen config={gameConfig} onBackToSetup={handleBackToSetup} />;
}

// ─── Game Logic ──────────────────────────────────────────────────────────────

function GameScreen({ config, onBackToSetup }) {
  const { mode, players, activeTiles } = config;
  const isSolo = mode === MODE.SOLO;
  const isLowest = mode === MODE.LOWEST || isSolo;

  const initPlayerBoards = () => players.map(() => initialTiles(activeTiles));
  const initSharedBoard = () => initialTiles(activeTiles);

  const [playerBoards, setPlayerBoards] = useState(initPlayerBoards); // lowest score only
  const [sharedBoard, setSharedBoard] = useState(initSharedBoard);    // sudden death only
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [eliminated, setEliminated] = useState([]); // sudden death
  const [playersDone, setPlayersDone] = useState([]); // lowest score — players who have passed
  const [phase, setPhase] = useState(PHASE.IDLE);
  const [dice, setDice] = useState([null, null]);
  const [rolling, setRolling] = useState(false);
  const [eventFace, setEventFace] = useState(null);
  const [effectiveDice, setEffectiveDice] = useState([null, null]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [log, setLog] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [eventDieUsed, setEventDieUsed] = useState(false);
  const [pendingEffect, setPendingEffect] = useState(null);
  const [wildValue, setWildValue] = useState("");
  const [hasRolledOnce, setHasRolledOnce] = useState(false); // for Pass button
  const [gameOverData, setGameOverData] = useState(null);
  const [passConfirm, setPassConfirm] = useState(false); // waiting for next player to tap
  const [bustSelected, setBustSelected] = useState(null);
  const [flipSelected, setFlipSelected] = useState(null);
  const [dieChoice, setDieChoice] = useState(null); // 0 or 1 — staged die selection for +1/+2/wild_pick/x2

  const tilesRef = React.useRef(isLowest ? playerBoards[currentPlayer] : sharedBoard);

  // Keep ref in sync
  useEffect(() => {
    tilesRef.current = isLowest ? playerBoards[currentPlayer] : sharedBoard;
  }, [playerBoards, sharedBoard, currentPlayer, isLowest]);

  const addLog = (msg) => setLog(l => [`${players[currentPlayer]}: ${msg}`, ...l]);

  const currentTiles = isLowest ? playerBoards[currentPlayer] : sharedBoard;

  function setCurrentTiles(newTiles) {
    if (isLowest) {
      setPlayerBoards(prev => prev.map((b, i) => i === currentPlayer ? newTiles : b));
    } else {
      setSharedBoard(newTiles);
    }
  }

  function getTotal(d) { return (d[0] || 0) + (d[1] || 0); }

  function resetTurnState() {
    setDice([null, null]);
    setEffectiveDice([null, null]);
    setEventFace(null);
    setEventDieUsed(false);
    setSelectedTiles([]);
    setPendingEffect(null);
    setWildValue("");
    setBustSelected(null);
    setFlipSelected(null);
    setDieChoice(null);
  }

  // ── Pass / next player ──────────────────────────────────────────────────────
  function passOrNextPlayer() {
    if (isLowest) {
      // Mark current player as done
      const nowDone = [...playersDone, currentPlayer];
      setPlayersDone(nowDone);
      resetTurnState();
      setHasRolledOnce(false);
      setPhase(PHASE.IDLE);

      // Find next player not yet done
      const activePlayers = players.map((_, i) => i).filter(i => !nowDone.includes(i));
      if (activePlayers.length === 0) {
        // All done — compute winner
        endLowestScoreGame(nowDone);
      } else {
        setCurrentPlayer(activePlayers[0]);
        setPassConfirm(true);
      }
    } else {
      // Sudden death — just next player
      const active = players.map((_, i) => i).filter(i => !eliminated.includes(i));
      const idx = active.indexOf(currentPlayer);
      const next = active[(idx + 1) % active.length];
      setCurrentPlayer(next);
      resetTurnState();
      setHasRolledOnce(false);
      setPhase(PHASE.IDLE);
      setPassConfirm(true);
    }
  }

  function endLowestScoreGame(doneList) {
    const scores = players.map((name, i) => ({
      name,
      score: calcScore(playerBoards[i]),
      tiles: playerBoards[i],
    }));
    const best = Math.min(...scores.map(s => s.score));
    const winners = scores.filter(s => s.score === best).map(s => s.name);
    setGameOverData({ scores, winners, mode: MODE.LOWEST });
    setGameOver(true);
    setPhase(PHASE.GAME_OVER);
  }

  function endGame(finalTiles, perfect) {
    const s = calcScore(finalTiles);
    setGameOverData({ score: s, perfect, name: players[0], mode: MODE.SOLO });
    setGameOver(true);
    setPhase(PHASE.GAME_OVER);
  }

  function eliminateCurrentPlayer() {
    const nowElim = [...eliminated, currentPlayer];
    setEliminated(nowElim);
    const active = players.map((_, i) => i).filter(i => !nowElim.includes(i));
    addLog(`${players[currentPlayer]} is eliminated!`);

    if (active.length === 1) {
      setGameOverData({ winner: players[active[0]], mode: MODE.SUDDEN });
      setGameOver(true);
      setPhase(PHASE.GAME_OVER);
    } else if (active.length === 0) {
      setGameOverData({ winner: null, mode: MODE.SUDDEN });
      setGameOver(true);
      setPhase(PHASE.GAME_OVER);
    } else {
      const idx = active.indexOf(currentPlayer) === -1 ? 0 : active.indexOf(currentPlayer);
      setCurrentPlayer(active[idx % active.length]);
      resetTurnState();
      setHasRolledOnce(false);
      setPhase(PHASE.IDLE);
      setPassConfirm(true);
    }
  }

  // ── Roll dice ───────────────────────────────────────────────────────────────
  function rollDice() {
    setRolling(true);
    setTimeout(() => {
      const d = [rollD6(), rollD6()];
      const ct = tilesRef.current;
      setDice(d);
      setEffectiveDice(d);
      setEventFace(null);
      setEventDieUsed(false);
      setSelectedTiles([]);
      setPendingEffect(null);
      setWildValue("");
      setRolling(false);
      setHasRolledOnce(true);
      addLog(`Rolled ${d[0]} + ${d[1]} = ${d[0] + d[1]}`);
      setPhase(PHASE.ROLLED);
    }, 380);
  }

  // ── Event die ───────────────────────────────────────────────────────────────
  function rollEventDieAction(type) {
    const faces = type === "safe" ? SAFE_DIE_FACES : RISK_DIE_FACES;
    const face = faces[Math.floor(Math.random() * faces.length)];
    setEventFace(face);
    setEventDieUsed(true);
    addLog(`${type === "safe" ? "Safe" : "Risk"} Die → ${FACE_LABELS[face]}`);
    resolveEventFace(face);
  }

  function resolveEventFace(face) {
    switch (face) {
      case "blank": setPhase(PHASE.ROLLED); break;
      case "+1": setPendingEffect({ type: "+1" }); setPhase(PHASE.EVENT_ROLLED); break;
      case "+2": setPendingEffect({ type: "+2" }); setPhase(PHASE.EVENT_ROLLED); break;
      case "wild": setPendingEffect({ type: "wild" }); setPhase(PHASE.EVENT_ROLLED); break;
      case "flip": setPendingEffect({ type: "flip" }); setPhase(PHASE.FLIP_PICK); break;
      case "+3": {
        const nd = [effectiveDice[0] + 3, effectiveDice[1]];
        setEffectiveDice(nd);
        addLog(`Total boosted by 3 → ${nd[0] + nd[1]}`);
        setPhase(PHASE.ROLLED);
        break;
      }
      case "x2": setPendingEffect({ type: "x2" }); setPhase(PHASE.EVENT_ROLLED); break;
      case "bust": setPendingEffect({ type: "bust" }); setPhase(PHASE.BUST_PICK); break;
      default: setPhase(PHASE.ROLLED);
    }
  }

  function applyPlusMod(mod) {
    return (dieIndex) => {
      const nd = [...effectiveDice];
      nd[dieIndex] += mod;
      setEffectiveDice(nd);
      addLog(`Die ${dieIndex + 1} boosted to ${nd[dieIndex]}, total = ${nd[0] + nd[1]}`);
      setPendingEffect(null);
      setPhase(PHASE.ROLLED);
    };
  }

  function applyWild() {
    const v = parseInt(wildValue);
    if (isNaN(v) || v < 1 || v > 6) return;
    setPendingEffect({ type: "wild_pick", value: v });
    setDieChoice(null);
    addLog(`Wild value ${v} — pick which die to replace`);
  }

  function applyWildToDie(dieIndex) {
    const v = pendingEffect.value;
    const nd = [...effectiveDice];
    nd[dieIndex] = v;
    setEffectiveDice(nd);
    addLog(`Die ${dieIndex + 1} set to ${v}, total = ${nd[0] + nd[1]}`);
    setPendingEffect(null);
    setWildValue("");
    setPhase(PHASE.ROLLED);
  }

  function applyX2(dieIndex) {
    const nd = [...effectiveDice];
    nd[dieIndex] = nd[dieIndex] * 2;
    setEffectiveDice(nd);
    addLog(`Die ${dieIndex + 1} doubled to ${nd[dieIndex]}, total = ${nd[0] + nd[1]}`);
    setPendingEffect(null);
    setPhase(PHASE.ROLLED);
  }

  function selectFlipTile(tileNum) {
    if (currentTiles[tileNum] === "cursed") return;
    setFlipSelected(tileNum);
  }

  function confirmFlip() {
    if (flipSelected === null) return;
    const s = currentTiles[flipSelected];
    if (s === "cursed") return;
    const newState = s === "open" ? "closed" : "open";
    const newTiles = { ...currentTiles, [flipSelected]: newState };
    setCurrentTiles(newTiles);
    addLog(`Tile ${flipSelected} flipped → ${newState}`);
    setPendingEffect(null);
    setFlipSelected(null);
    const remaining = Object.values(newTiles).filter(s => s !== "closed").length;
    if (remaining === 0) { endTurnPerfect(newTiles); return; }
    setPhase(PHASE.ROLLED);
  }

  function selectBustTile(tileNum) {
    if (currentTiles[tileNum] !== "open") return;
    setBustSelected(tileNum);
  }

  function confirmBust() {
    if (bustSelected === null) return;
    const newTiles = { ...currentTiles, [bustSelected]: "cursed" };
    setCurrentTiles(newTiles);
    addLog(`💀 Tile ${bustSelected} CURSED — permanently open`);
    setPendingEffect(null);
    setBustSelected(null);
    setPhase(PHASE.ROLLED);
  }

  function endTurnPerfect(finalTiles) {
    addLog("🎉 All tiles closed!");
    if (isSolo) {
      endGame(finalTiles, true);
    } else if (isLowest) {
      passOrNextPlayer();
    } else {
      setGameOverData({ winner: players[currentPlayer], mode: MODE.SUDDEN, perfect: true });
      setGameOver(true);
      setPhase(PHASE.GAME_OVER);
    }
  }

  function toggleTileSelection(num) {
    if (currentTiles[num] !== "open") return;
    setSelectedTiles(prev =>
      prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num]
    );
  }

  function confirmSelection() {
    const total = getTotal(effectiveDice);
    const sum = selectedTiles.reduce((a, b) => a + b, 0);
    if (sum !== total) return;
    if (!selectedTiles.every(n => currentTiles[n] === "open")) return;

    const newTiles = { ...currentTiles };
    selectedTiles.forEach(n => { newTiles[n] = "closed"; });
    setCurrentTiles(newTiles);
    addLog(`Closed: [${[...selectedTiles].sort((a, b) => a - b).join(", ")}]`);
    setSelectedTiles([]);

    const remaining = Object.values(newTiles).filter(s => s !== "closed").length;
    if (remaining === 0) { endTurnPerfect(newTiles); return; }
    setPhase(PHASE.IDLE);
  }

  // ── Derived ─────────────────────────────────────────────────────────────────
  const total = getTotal(effectiveDice);
  const selectedSum = selectedTiles.reduce((a, b) => a + b, 0);
  const selectionValid = selectedTiles.length > 0 && selectedSum === total;
  const isStuck = phase === PHASE.ROLLED && !pendingEffect
    && effectiveDice[0] !== null && effectiveDice[1] !== null
    && validCombos(total, currentTiles).length === 0;

  const flippableTiles = phase === PHASE.FLIP_PICK
    ? Object.entries(currentTiles).filter(([, s]) => s !== "cursed").map(([n]) => parseInt(n)) : [];
  const bustableTiles = phase === PHASE.BUST_PICK
    ? Object.entries(currentTiles).filter(([, s]) => s === "open").map(([n]) => parseInt(n)) : [];
  const selectableTiles = phase === PHASE.ROLLED
    ? Object.entries(currentTiles).filter(([, s]) => s === "open").map(([n]) => parseInt(n)) : [];

  const tileClickable = n => {
    if (phase === PHASE.FLIP_PICK && flippableTiles.includes(n)) return true;
    if (phase === PHASE.BUST_PICK && bustableTiles.includes(n)) return true;
    if (phase === PHASE.ROLLED && selectableTiles.includes(n)) return true;
    return false;
  };
  const handleTileClick = (n) => {
    if (phase === PHASE.FLIP_PICK) { selectFlipTile(n); return; }
    if (phase === PHASE.BUST_PICK) { selectBustTile(n); return; }
    if (phase === PHASE.ROLLED) { toggleTileSelection(n); }
  };

  const tileIsSelected = n =>
    selectedTiles.includes(n) ||
    (phase === PHASE.BUST_PICK && bustSelected === n) ||
    (phase === PHASE.FLIP_PICK && flipSelected === n);

  const openCount = Object.values(currentTiles).filter(s => s === "open").length;
  const closedCount = Object.values(currentTiles).filter(s => s === "closed").length;
  const cursedCount = Object.values(currentTiles).filter(s => s === "cursed").length;

  const activePlayers = players.filter((_, i) => !eliminated.includes(i));

  // ── Pass confirm screen ──────────────────────────────────────────────────────
  if (passConfirm) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 30%, #1e4a1e 0%, #0d2a0d 60%, #071507 100%)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: 24, fontFamily: "'Georgia', serif",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,168,50,0.2)",
          borderRadius: 16, padding: "32px 40px", textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)", maxWidth: 340,
        }}>
          <div style={{ fontSize: 13, color: "#6aaa6a", marginBottom: 8, letterSpacing: 1 }}>
            Next up
          </div>
          <div style={{ fontSize: 28, color: "#e8d88a", fontWeight: "bold", marginBottom: 8 }}>
            {players[currentPlayer]}
          </div>
          {isLowest && (
            <div style={{ fontSize: 13, color: "#6a8a6a", marginBottom: 20 }}>
              Hand the device over, then tap Ready.
            </div>
          )}
          {!isLowest && (
            <div style={{ fontSize: 13, color: "#6a8a6a", marginBottom: 20 }}>
              Pass the device, then tap Ready.
            </div>
          )}
          <Button onClick={() => setPassConfirm(false)} variant="gold">
            Ready — Let's Go
          </Button>
        </div>
      </div>
    );
  }

  // ── Game over screen ─────────────────────────────────────────────────────────
  if (gameOver && gameOverData) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 30%, #1e4a1e 0%, #0d2a0d 60%, #071507 100%)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: 24, fontFamily: "'Georgia', serif",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,168,50,0.2)",
          borderRadius: 16, padding: "32px 28px", textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)", maxWidth: 400, width: "100%",
        }}>
          {gameOverData.mode === MODE.SOLO ? (
            <>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{gameOverData.perfect ? "🎉" : "🎲"}</div>
              <div style={{ color: gameOverData.perfect ? "#e8d88a" : "#a8c8a8", fontSize: 22, fontWeight: "bold", marginBottom: 4 }}>
                {gameOverData.perfect ? "Perfect Game!" : "Game Over"}
              </div>
              {!gameOverData.perfect && (
                <>
                  <div style={{ color: "#6a8a6a", fontSize: 13, marginBottom: 4 }}>Final Score</div>
                  <div style={{ color: "#e8d88a", fontSize: 48, fontWeight: "bold", lineHeight: 1, marginBottom: 4 }}>
                    {gameOverData.score}
                  </div>
                  <div style={{ color: "#4a7a4a", fontSize: 12, marginBottom: 16 }}>lower is better</div>
                </>
              )}
              {gameOverData.perfect && (
                <div style={{ color: "#6aaa6a", fontSize: 14, marginBottom: 16 }}>All 12 tiles closed!</div>
              )}
            </>
          ) : gameOverData.mode === MODE.SUDDEN ? (
            <>
              <div style={{ fontSize: 36, marginBottom: 8 }}>
                {gameOverData.perfect ? "🎉" : "👑"}
              </div>
              <div style={{ color: "#e8d88a", fontSize: 26, fontWeight: "bold", marginBottom: 4 }}>
                {gameOverData.winner ? `${gameOverData.winner} wins!` : "Draw!"}
              </div>
              {gameOverData.perfect && (
                <div style={{ color: "#6aaa6a", fontSize: 14, marginBottom: 16 }}>Perfect clear!</div>
              )}
            </>
          ) : (
            <>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🏆</div>
              <div style={{ color: "#e8d88a", fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>
                {gameOverData.winners.length === 1
                  ? `${gameOverData.winners[0]} wins!`
                  : `Tie: ${gameOverData.winners.join(" & ")}!`}
              </div>
              <div style={{ marginBottom: 20 }}>
                {gameOverData.scores
                  .sort((a, b) => a.score - b.score)
                  .map((s, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "8px 12px", marginBottom: 6,
                      background: s.score === gameOverData.scores.reduce((m, x) => Math.min(m, x.score), Infinity)
                        ? "rgba(200,168,50,0.15)" : "rgba(255,255,255,0.03)",
                      borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)",
                    }}>
                      <span style={{ color: "#c8d890", fontSize: 15 }}>{s.name}</span>
                      <span style={{ color: "#e8d88a", fontWeight: "bold", fontSize: 18 }}>{s.score}</span>
                    </div>
                  ))}
              </div>
            </>
          )}
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <Button onClick={() => {
              setPlayerBoards(players.map(() => initialTiles(activeTiles)));
              setSharedBoard(initialTiles(activeTiles));
              setCurrentPlayer(0);
              setEliminated([]);
              setPlayersDone([]);
              setPhase(PHASE.IDLE);
              resetTurnState();
              setLog([]);
              setGameOver(false);
              setGameOverData(null);
              setHasRolledOnce(false);
              if (!isSolo) setPassConfirm(true);
            }} variant="gold">Play Again</Button>
            <Button onClick={onBackToSetup} variant="primary">Change Setup</Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main game UI ─────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 30%, #1e4a1e 0%, #0d2a0d 60%, #071507 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "flex-start", padding: "20px 16px 40px",
      fontFamily: "'Georgia', serif",
    }}>
      <style>{`
        @keyframes dieSpin {
          0% { transform: rotate(0deg) scale(1); }
          40% { transform: rotate(180deg) scale(1.15); }
          100% { transform: rotate(360deg) scale(1); }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a2e1a; }
        ::-webkit-scrollbar-thumb { background: #3a6a3a; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16, position: "relative", width: "100%", maxWidth: 560,
      }}>
        <button
          onClick={onBackToSetup}
          style={{
            position: "absolute", left: 0,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8, padding: "6px 12px",
            color: "#6aaa6a", fontFamily: "'Georgia', serif",
            fontSize: 13, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 4,
          }}
        >
          ← Menu
        </button>
        <div style={{ textAlign: "center" }}>
          <h1 style={{
            margin: 0, fontSize: 30, fontWeight: "bold", color: "#e8d88a",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)", letterSpacing: 1,
          }}>Flip the Box</h1>
          <div style={{ fontSize: 11, color: "#4a7a4a", letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>
            {isSolo ? "Solo" : isLowest ? "Lowest Score" : "Sudden Death"}
          </div>
        </div>
      </div>

      {/* Player tabs (lowest score, multi-player only) */}
      {isLowest && !isSolo && (
        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap", justifyContent: "center" }}>
          {players.map((name, i) => (
            <div key={i} style={{
              padding: "5px 14px", borderRadius: 20, fontSize: 12,
              background: i === currentPlayer ? "rgba(200,168,50,0.2)" : "rgba(255,255,255,0.03)",
              border: `1.5px solid ${i === currentPlayer ? "#c8a832" : "rgba(255,255,255,0.08)"}`,
              color: playersDone.includes(i) ? "#3a5a3a" : i === currentPlayer ? "#e8d88a" : "#6a8a6a",
              fontWeight: i === currentPlayer ? "bold" : "normal",
              textDecoration: playersDone.includes(i) ? "line-through" : "none",
            }}>
              {name} {playersDone.includes(i) ? `(${calcScore(playerBoards[i])})` : ""}
            </div>
          ))}
        </div>
      )}

      {/* Sudden death player indicator */}
      {!isLowest && (
        <div style={{
          display: "flex", gap: 8, marginBottom: 14, justifyContent: "center",
        }}>
          {players.map((name, i) => (
            <div key={i} style={{
              padding: "5px 14px", borderRadius: 20, fontSize: 12,
              background: i === currentPlayer ? "rgba(200,168,50,0.2)" : "rgba(255,255,255,0.03)",
              border: `1.5px solid ${eliminated.includes(i) ? "#c84040" : i === currentPlayer ? "#c8a832" : "rgba(255,255,255,0.08)"}`,
              color: eliminated.includes(i) ? "#c84040" : i === currentPlayer ? "#e8d88a" : "#6a8a6a",
              fontWeight: i === currentPlayer ? "bold" : "normal",
              textDecoration: eliminated.includes(i) ? "line-through" : "none",
            }}>
              {name}
            </div>
          ))}
        </div>
      )}

      {/* Main game area */}
      <div style={{
        width: "100%", maxWidth: 560,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(200,168,50,0.2)",
        borderRadius: 16, padding: "16px 16px 20px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}>
        {/* Current player banner — hidden in solo */}
        {!isSolo && (
          <div style={{
            textAlign: "center", marginBottom: 12,
            fontSize: 16, color: "#e8d88a", fontWeight: "bold",
          }}>
            {players[currentPlayer]}'s turn
          </div>
        )}

        {/* Stats */}
        <div style={{
          display: "flex", justifyContent: "space-between", marginBottom: 14,
          fontSize: 12, color: "#6aaa6a", letterSpacing: 1, textTransform: "uppercase",
        }}>
          <span>Open: <b style={{ color: "#c8d890" }}>{openCount}</b></span>
          <span>Closed: <b style={{ color: "#6aaa6a" }}>{closedCount}</b></span>
          {cursedCount > 0 && <span>Cursed: <b style={{ color: "#c84040" }}>{cursedCount}</b></span>}
          {total > 0 && phase !== PHASE.IDLE && (
            <span>Target: <b style={{ color: "#e8d88a" }}>{total}</b></span>
          )}
        </div>

        {/* Tiles */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 16 }}>
          {activeTiles.map(n => (
            <Tile
              key={n}
              number={n}
              state={currentTiles[n]}
              onClick={handleTileClick}
              selectable={tileClickable(n)}
              selected={tileIsSelected(n)}
            />
          ))}
        </div>

        {/* Dice */}
        {phase !== PHASE.IDLE && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 16, marginBottom: 14,
          }}>
            <Die value={effectiveDice[0]} rolling={rolling} />
            <span style={{ color: "#6aaa6a", fontSize: 22 }}>+</span>
            <Die value={effectiveDice[1]} rolling={rolling} />
            <span style={{ color: "#c8a832", fontSize: 22, fontWeight: "bold" }}>= {total}</span>
            {eventFace && <EventDieFace face={eventFace} />}
          </div>
        )}

        {/* Instructions */}
        <div style={{
          textAlign: "center", marginBottom: 12, minHeight: 36,
          color: "#a8c8a8", fontSize: 13, lineHeight: 1.5,
        }}>
          {phase === PHASE.IDLE && "Roll the dice to begin your turn."}
          {phase === PHASE.ROLLED && !pendingEffect && !isStuck && `Select tiles that sum to ${total}, then confirm.`}
          {phase === PHASE.ROLLED && !pendingEffect && isStuck && <span style={{ color: "#e8a070" }}>No valid combinations for {total}. Try an event die or give up.</span>}
          {phase === PHASE.FLIP_PICK && "Select any tile to flip its state, then confirm."}
          {phase === PHASE.BUST_PICK && <span style={{ color: "#e87070" }}>💀 Bust! Select a tile to curse, then confirm.</span>}
          {phase === PHASE.EVENT_ROLLED && pendingEffect?.type === "+1" && "Pick which die to add +1 to:"}
          {phase === PHASE.EVENT_ROLLED && pendingEffect?.type === "+2" && "Pick which die to add +2 to:"}
          {phase === PHASE.EVENT_ROLLED && pendingEffect?.type === "wild" && "Enter a value (1–6) for your Wild:"}
          {phase === PHASE.EVENT_ROLLED && pendingEffect?.type === "wild_pick" && "Pick which die to replace:"}
          {phase === PHASE.EVENT_ROLLED && pendingEffect?.type === "x2" && "Pick which die to double:"}
        </div>

        {/* Flip confirm */}
        {phase === PHASE.FLIP_PICK && (
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 12 }}>
            <Button onClick={confirmFlip} disabled={flipSelected === null} variant="gold">
              {flipSelected !== null
                ? `⇅ Confirm — Flip Tile ${flipSelected} (${currentTiles[flipSelected] === "open" ? "open → closed" : "closed → open"})`
                : "⇅ Select a tile above"}
            </Button>
            {flipSelected !== null && (
              <Button onClick={() => setFlipSelected(null)} variant="primary">↩ Change</Button>
            )}
          </div>
        )}

        {/* Bust confirm */}
        {phase === PHASE.BUST_PICK && (
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 12 }}>
            <Button onClick={confirmBust} disabled={bustSelected === null} variant="danger">
              {bustSelected !== null ? `💀 Confirm — Curse Tile ${bustSelected}` : "💀 Select a tile above"}
            </Button>
            {bustSelected !== null && (
              <Button onClick={() => setBustSelected(null)} variant="primary">↩ Change</Button>
            )}
          </div>
        )}

        {/* Event die resolvers */}
        {phase === PHASE.EVENT_ROLLED && pendingEffect && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center", marginBottom: 12 }}>

            {/* +1 / +2 — pick which die, then confirm */}
            {(pendingEffect.type === "+1" || pendingEffect.type === "+2") && (() => {
              const mod = pendingEffect.type === "+1" ? 1 : 2;
              return (
                <>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[0, 1].map(i => (
                      <button key={i} onClick={() => setDieChoice(i)} style={{
                        padding: "10px 20px", borderRadius: 8, cursor: "pointer",
                        fontFamily: "'Georgia', serif", fontWeight: "bold", fontSize: 14,
                        background: dieChoice === i ? "rgba(200,168,50,0.3)" : "rgba(255,255,255,0.04)",
                        border: `2px solid ${dieChoice === i ? "#c8a832" : "rgba(255,255,255,0.15)"}`,
                        color: dieChoice === i ? "#e8d88a" : "#8aaa8a",
                        transition: "all 0.15s",
                      }}>
                        Die {i + 1}: {effectiveDice[i]} → {effectiveDice[i] + mod}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button
                      onClick={() => { applyPlusMod(mod)(dieChoice); setDieChoice(null); }}
                      disabled={dieChoice === null}
                      variant="gold"
                    >
                      {dieChoice !== null ? `✓ Confirm — Die ${dieChoice + 1} becomes ${effectiveDice[dieChoice] + mod}` : `✓ Select a die above`}
                    </Button>
                    {dieChoice !== null && <Button onClick={() => setDieChoice(null)} variant="primary">↩ Change</Button>}
                  </div>
                </>
              );
            })()}

            {/* Wild — enter value, then pick die, then confirm */}
            {pendingEffect.type === "wild" && (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="number" min={1} max={6} value={wildValue}
                  onChange={e => setWildValue(e.target.value)}
                  style={{
                    width: 56, padding: "8px 10px",
                    background: "#1a2e1a", border: "1px solid #4a8a4a",
                    borderRadius: 6, color: "#e8f4e8",
                    fontFamily: "'Georgia', serif", fontSize: 16, textAlign: "center",
                  }}
                />
                <Button onClick={applyWild} variant="gold" disabled={!wildValue || parseInt(wildValue) < 1 || parseInt(wildValue) > 6}>Set Wild</Button>
              </div>
            )}

            {/* wild_pick — pick which die to replace, then confirm */}
            {pendingEffect.type === "wild_pick" && (() => {
              const v = pendingEffect.value;
              return (
                <>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[0, 1].map(i => (
                      <button key={i} onClick={() => setDieChoice(i)} style={{
                        padding: "10px 20px", borderRadius: 8, cursor: "pointer",
                        fontFamily: "'Georgia', serif", fontWeight: "bold", fontSize: 14,
                        background: dieChoice === i ? "rgba(200,168,50,0.3)" : "rgba(255,255,255,0.04)",
                        border: `2px solid ${dieChoice === i ? "#c8a832" : "rgba(255,255,255,0.15)"}`,
                        color: dieChoice === i ? "#e8d88a" : "#8aaa8a",
                        transition: "all 0.15s",
                      }}>
                        Die {i + 1}: {effectiveDice[i]} → {v}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button
                      onClick={() => { applyWildToDie(dieChoice); setDieChoice(null); }}
                      disabled={dieChoice === null}
                      variant="gold"
                    >
                      {dieChoice !== null ? `✓ Confirm — Die ${dieChoice + 1} becomes ${v}` : "✓ Select a die above"}
                    </Button>
                    {dieChoice !== null && <Button onClick={() => setDieChoice(null)} variant="primary">↩ Change</Button>}
                  </div>
                </>
              );
            })()}

            {/* ×2 — pick which die, then confirm */}
            {pendingEffect.type === "x2" && (() => {
              return (
                <>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[0, 1].map(i => (
                      <button key={i} onClick={() => setDieChoice(i)} style={{
                        padding: "10px 20px", borderRadius: 8, cursor: "pointer",
                        fontFamily: "'Georgia', serif", fontWeight: "bold", fontSize: 14,
                        background: dieChoice === i ? "rgba(200,168,50,0.3)" : "rgba(255,255,255,0.04)",
                        border: `2px solid ${dieChoice === i ? "#c8a832" : "rgba(255,255,255,0.15)"}`,
                        color: dieChoice === i ? "#e8d88a" : "#8aaa8a",
                        transition: "all 0.15s",
                      }}>
                        Die {i + 1}: {effectiveDice[i]} → {effectiveDice[i] * 2}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Button
                      onClick={() => { applyX2(dieChoice); setDieChoice(null); }}
                      disabled={dieChoice === null}
                      variant="gold"
                    >
                      {dieChoice !== null ? `✓ Confirm — Die ${dieChoice + 1} becomes ${effectiveDice[dieChoice] * 2}` : "✓ Select a die above"}
                    </Button>
                    {dieChoice !== null && <Button onClick={() => setDieChoice(null)} variant="primary">↩ Change</Button>}
                  </div>
                </>
              );
            })()}

          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
          {phase === PHASE.IDLE && (
            <Button onClick={rollDice} disabled={rolling}>🎲 Roll Dice</Button>
          )}
          {phase === PHASE.ROLLED && !pendingEffect && (
            <>
              {!eventDieUsed && (
                <>
                  <Button onClick={() => rollEventDieAction("safe")} variant="primary">🛡 Safe Die</Button>
                  <Button onClick={() => rollEventDieAction("risk")} variant="danger">⚡ Risk Die</Button>
                </>
              )}
              <Button onClick={confirmSelection} disabled={!selectionValid} variant="gold">
                ✓ Confirm ({selectedSum}/{total})
              </Button>
              {isStuck && (
                <Button
                  onClick={() => {
                    if (eventDieUsed) {
                      if (isSolo) {
                        endGame(currentTiles, false);
                      } else if (isLowest) {
                        addLog(`Stuck — turn ends.`);
                        passOrNextPlayer();
                      } else {
                        eliminateCurrentPlayer();
                      }
                    } else {
                      if (isSolo) {
                        addLog(`Gave up turn — no combo for ${total}`);
                        setPhase(PHASE.IDLE);
                      } else {
                        addLog(`Gave up turn — no combo for ${total}`);
                        passOrNextPlayer();
                      }
                    }
                  }}
                  variant={eventDieUsed ? "danger" : "primary"}
                >
                  {eventDieUsed
                    ? (isSolo ? "✗ End Game" : isLowest ? "✗ End Turn" : "✗ Eliminated")
                    : "↩ Give Up Turn"}
                </Button>
              )}
            </>
          )}
          {/* Pass button — all multi-player modes, after at least one roll */}
          {!isSolo && phase === PHASE.IDLE && hasRolledOnce && (
            <Button onClick={passOrNextPlayer} variant="primary">
              ➤ Pass to Next Player
            </Button>
          )}
        </div>

        <Log entries={log} />

        {/* Legend */}
        <div style={{
          marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center",
          fontSize: 11, color: "#4a7a4a",
        }}>
          <span>🟡 selectable</span>
          <span>🟫 closed</span>
          <span>💀 cursed</span>
        </div>
      </div>

      {/* Dice reference */}
      <div style={{ marginTop: 16, width: "100%", maxWidth: 560, display: "flex", gap: 10 }}>
        {[
          { name: "Safe Die", faces: SAFE_DIE_FACES, color: "#3a6a3a" },
          { name: "Risk Die", faces: RISK_DIE_FACES, color: "#6a2a2a" },
        ].map(({ name, faces, color }) => (
          <div key={name} style={{
            flex: 1, background: "rgba(0,0,0,0.25)",
            border: `1px solid ${color}55`, borderRadius: 10, padding: "10px 12px",
          }}>
            <div style={{
              fontSize: 11, letterSpacing: 2,
              color: color === "#3a6a3a" ? "#6aaa6a" : "#c87070",
              textTransform: "uppercase", marginBottom: 6, fontWeight: "bold",
            }}>{name}</div>
            {faces.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, fontSize: 12, color: "#6a8a6a" }}>
                <span style={{
                  width: 14, height: 14, borderRadius: 3,
                  background: FACE_COLORS[f] + "55", border: `1px solid ${FACE_COLORS[f]}88`,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, color: FACE_COLORS[f], flexShrink: 0,
                }}>●</span>
                {FACE_LABELS[f]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
