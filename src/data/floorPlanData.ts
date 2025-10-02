export const floorPlanData = {
  rooms: [
    { name: 'WORKSHOP', points: [[0, 0], [10, 0], [10, 15], [0, 15]] },
    { name: 'ROY 7 A', points: [[0, 15], [6, 15], [6, 22], [0, 22]] },
    { name: 'TOILETS\nLADIES', points: [[0, 22], [3, 22], [3, 24], [0, 24]] },
    { name: 'TOILET\nGENTS', points: [[0, 24], [3, 24], [3, 26], [0, 26]] },
    { name: 'ADMIN', points: [[0, 27], [6, 27], [6, 30], [0, 30]] },
    { name: 'AMENITIES', points: [[0, 30], [4, 30], [4, 32], [0, 32]] },
    { name: 'SEMINAR\nHALL', points: [[4, 33], [16, 33], [16, 37], [4, 37]] },
    { name: 'ADMIN', points: [[16, 33], [20, 33], [20, 37], [16, 37]] },
    { name: 'ADMIN', points: [[20, 33], [24, 33], [24, 37], [20, 37]] },
    { name: 'ADMIN\nOFFICE', points: [[7, 27], [11, 27], [11, 30], [7, 30]] },
    { name: 'ADMIN\nOFFICE', points: [[11, 27], [15, 27], [15, 30], [11, 30]] },
    { name: 'WAITING\nAREA', points: [[15, 27], [19, 27], [19, 30], [15, 30]] },
    { name: 'GYMKHANA', points: [[10, 0], [16, 0], [16, 5], [10, 5]] },
    { name: 'LAB', points: [[16, 0], [22, 0], [22, 5], [16, 5]] },
    { name: 'DARK\nROOM', points: [[16, 5], [22, 5], [22, 8], [16, 8]] },
    { name: 'SEMINAR\nAREA', points: [[6, 8], [22, 8], [22, 18], [20, 18], [20, 20], [18, 20], [18, 22], [6, 22]] },
    { name: 'LAB', points: [[20, 18], [24, 18], [24, 21], [20, 21]] },
    { name: 'ADMIN', points: [[20, 21], [24, 21], [24, 23], [20, 23]] },
    { name: 'LAB', points: [[25, -4], [30, -4], [30, 0], [25, 0]] },
    { name: 'STORE', points: [[25, 0], [30, 0], [30, 4], [25, 4]] },
    { name: 'LAB', points: [[25, 4], [30, 4], [30, 8], [25, 8]] },
    { name: 'LAB', points: [[25, 9], [30, 9], [30, 13], [25, 13]] },
    { name: 'STORE', points: [[30, 9], [32, 9], [32, 13], [30, 13]] },
    { name: 'LAB', points: [[25, 13], [30, 13], [30, 17], [25, 17]] },
    { name: 'ENTRANCE\nLOBBY', points: [[26, 24], [31, 24], [31, 27], [26, 27]] },
    { name: 'LIFT', points: [[31, 24], [33, 24], [33, 27], [31, 27]] },
    { name: 'FIRE\nEXIT', points: [[25, 21], [31, 21], [31, 24], [25, 24]] },
  ],
  walls: [
    // --- Outer Perimeter Walls --- done
    { p1: [-1, -2], p2: [24.5, -2] },      // Top wall of Workshop, Gymkhana, Lab
    { p1: [-1, -2], p2: [-1, 33.5] },      // Left wall of Workshop, Roy 7 A, Toilets, Admin
    { p1: [-1, 33.5], p2: [4.5, 33.5] },      // Bottom wall of Amenities
    { p1: [4, 38], p2: [24.5, 38] },     // Bottom wall of Seminar Hall & Admins
    { p1: [4.2, 38], p2: [4.2, 31.5] },      // Connecting wall Amenities to Seminar Hall
    { p1: [24.5, 31.5], p2: [24.5, 38] },     // Right wall of south Admin

    // --- East Wing & Entrance Outer Walls --- done
    { p1: [26.5, -2], p2: [31, -2] },   // Top wall of top Lab
    { p1: [31, -2], p2: [31, 28.5] },    // Right wall of top Lab & Store
    { p1: [26.5, 16], p2: [31, 16] },   // Bottom wall of bottom Lab
    { p1: [26.5, 16], p2: [26.5, 21] },   // Left wall of Fire Exit access
    { p1: [26.5, 21], p2: [31, 21] },   // Top wall of Fire Exit
    { p1: [31, 21], p2: [35, 21] },   // Top wall of Lift
    { p1: [35, 21], p2: [35, 34] },   // Right wall of Lift
    { p1: [26.7, 34], p2: [30, 34] },   // Bottom wall of Lobby & Lift
    { p1: [31, 34], p2: [35, 34] },   // Bottom wall of Lobby & Lift
    { p1: [30, 31], p2: [30, 39] },   // Bottom wall of Lobby & Lift
    { p1: [26.7, 31], p2: [26.7, 39] },   // Bottom wall of Lobby & Lift
    { p1: [28, 39], p2: [30, 39] },   // Bottom wall of Lobby & Lift
    { p1: [26.5, 21], p2: [26.5, 28.5] },   // Left wall of Lobby

    // --- Internal Walls ---
    // Workshop/Gymkhana/Lab dividers  DONE
    { p1: [10.5, -2], p2: [10.5, 5.5] },     // Workshop -> Gymkhana
    { p1: [17, -2], p2: [17, 5.5] },      // Gymkhana -> Lab / Dark Room
    { p1: [24.5, -2], p2: [24.5, 4] },      // Lab -> Dark Room

    // West wing dividers DONE
    { p1: [-1, 12], p2: [5, 12] },      // Workshop -> Roy 7 A
    { p1: [-1, 16], p2: [6, 16] },      // Roy 7 A -> Toilets
    { p1: [-1, 19], p2: [3, 19] },      // Ladies -> Gents
    { p1: [-1, 22.5], p2: [3, 22.5] },      // Gents -> Admin
    { p1: [3, 17.5], p2: [3, 21] },      // Admin -> Amenities

    // Seminar Area and adjacent  DONE
    { p1: [7, 5.5], p2: [10.5, 5.5] },
    { p1: [11.5, 5.5], p2: [24.5, 5.5] },    // Top wall of Seminar Area
    { p1: [6, -2], p2: [6, 10] },    // Left wall of Seminar Area
    { p1: [6, 11.5], p2: [6, 23] },
    { p1: [6, 23], p2: [22.5, 23] },     // Left wall of Seminar Area
    { p1: [-1, 24.5], p2: [7, 24.5] },    // Left wall of Seminar Area
    { p1: [8, 24.5], p2: [12, 24.5] },    // Left wall of Seminar Area
    { p1: [13, 24.5], p2: [24.5, 24.5] },    // Left wall of Seminar Area
    { p1: [17.5, 15.5], p2: [17.5, 23] },   // Seminar Area inner corner
    { p1: [24.5, 8], p2: [24.5, 23] },    // Right wall of Seminar Area
    { p1: [17.5, 15.5], p2: [24.5, 15.5] },   // Top wall of Lab near Seminar

    // South wing dividers DONE
    { p1: [4, 31.5], p2: [12, 31.5] },
    { p1: [13.5, 31.5], p2: [17, 31.5] },
    { p1: [18, 31.5], p2: [24.5, 31.5] },  // Top wall of Seminar Hall & Admins
    { p1: [-1, 29.5], p2: [19, 29.5] },     // Bottom wall of Admin Offices
    { p1: [8, 24.5], p2: [8, 29.5] },      // Admin Office dividers
    { p1: [13, 24.5], p2: [13, 29.5] },   // Admin Office dividers
    { p1: [17.5, 24.5], p2: [17.5, 29.5] },   // Admin Office dividers
    { p1: [13.5, 31.5], p2: [13.5, 38] },   // Seminar Hall -> Admin divider
    { p1: [18, 31.5], p2: [18, 38] },   // Admin -> Admin divider

    // East wing dividers DONE
    { p1: [26.5, 2.5], p2: [31, 2.5] },      // Lab -> Store
    { p1: [28, 28.5], p2: [31, 28.5] },      // Lab -> Store
    { p1: [26.5, -2], p2: [26.5, 1] },      // Store -> Lab
    { p1: [26.5, 4], p2: [26.5, 8] },      // Store -> Lab
    { p1: [26.5, 9], p2: [26.5, 16] },      // Store -> Lab
    { p1: [33, 28.5], p2: [35, 28.5] },      // Corridor -> Lab
    { p1: [31, 25], p2: [35, 25] },      // Corridor -> Lab
    { p1: [31, 31.5], p2: [33, 31.5] },   // Lab -> Lab
    { p1: [31, 33], p2: [34, 33] },   // Lab -> Lab
    { p1: [31, 31.5], p2: [31, 33] },   // Lab -> Lab
    { p1: [34, 30], p2: [34, 33] },   // Lab -> Lab
  ],
  wallHeight: 3,
  wallThickness: 0.2,
  planSize: { width: 38, height: 42 }
};
