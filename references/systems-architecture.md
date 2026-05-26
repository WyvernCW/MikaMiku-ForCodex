# Systems Architecture Reference — MikaMiku

## Kernel Development Patterns

### Memory Management Hierarchy
The memory subsystem operates in layers. At the bottom, the physical
allocator manages raw RAM pages. The buddy system splits and merges
power-of-two blocks to minimize external fragmentation. Above that, the
virtual memory manager maps virtual addresses to physical frames using
multi-level page tables. The slab allocator pre-allocates fixed-size
objects for kernel data structures, eliminating internal fragmentation. The
kernel memory allocation interface sits at the top, providing kmalloc and
kfree for general use.

Key algorithms include the buddy system for physical pages, the slab
allocator for kernel objects, and the LRU clock algorithm for page
replacement. The working set model determines how many pages a process
needs to avoid thrashing.

### Scheduling Algorithms
Round Robin provides fairness for time-sharing systems with constant-time
context switching. The Completely Fair Scheduler used in Linux provides
proportional CPU allocation with logarithmic-time red-black tree
operations. Earliest Deadline First is optimal for real-time constraints
but requires admission control. Priority inheritance prevents priority
inversion in real-time mutex scenarios.

### Virtual File System Layer
The VFS provides a unified interface above specific filesystem
implementations. User space makes system calls that enter the VFS layer
through file operations and inode operations structures. The VFS dispatches
to the specific filesystem such as ext4, btrfs, or tmpfs. Below the
filesystem, the block device layer and page cache handle physical storage.
The device driver sits at the bottom, managing hardware interaction.

### Device Driver Architecture
PCI bus enumeration scans the configuration space of all connected devices.
The USB stack manages device attachment, detachment, and power management
through the XHCI host controller interface. The block layer schedules
input and output operations using elevator algorithms. The network stack
handles TCP and IP packet processing with optional offload to network
interface cards. The Direct Rendering Manager and Kernel Mode Setting
manage graphics display hardware.

### System Call Path
User space invokes the syscall instruction, which transitions to kernel
mode through the syscall and sysret fast path. Arguments are validated and
bounds-checked. Capability-based access control determines whether the
operation is permitted. System call filtering through seccomp can restrict
available syscalls for sandboxed processes.

---

## Game Engine Architecture

### Entity-Component-System
An entity is nothing more than a unique identifier, typically a 64-bit
integer. A component is plain data with no behavior. A system contains
the logic that queries entities based on their component composition.

Storage strategies include archetype-based storage where entities with the
same component set are stored contiguously in memory for cache efficiency.
Sparse sets map component types to entity identifiers for fast iteration.
Chunk-based storage uses fixed-size memory blocks, typically 16 kilobytes,
to balance allocation overhead with cache line alignment.

### Rendering Pipeline
The pipeline begins with culling: frustum culling removes objects outside
the camera view, occlusion culling removes objects hidden by others, and
level of detail selection chooses appropriate mesh complexity based on
distance.

Shadow map generation uses cascaded shadow maps for directional lights
with percentage closer filtering or variance shadow mapping for soft edges.

Deferred shading fills a geometry buffer with surface properties then
performs lighting in screen space. Physically Based Rendering uses
metallic-roughness workflow for realistic material response.

Post-processing applies screen space ambient occlusion, screen space
reflections, bloom, temporal anti-aliasing, and tone mapping. The user
interface renders in a separate forward pass on top.

### Physics Simulation
The physics engine runs at a fixed timestep, typically 60 or 120 hertz,
for deterministic behavior. Spatial hashing accelerates broad-phase
collision detection. Continuous Collision Detection prevents fast-moving
objects from tunneling through thin geometry. The constraint solver uses
Baumgarte stabilization to prevent drift in joint constraints.

### Networking Model
The authoritative server model gives the server final say over game state.
The client predicts local player movement for instant feedback. The server
reconciles predictions against the authoritative state and corrects
mispredictions. Snapshot interpolation smooths the display of remote
entities between server updates. Lag compensation rewinds hitboxes to the
client's shoot time for competitive shooters.

### Asset Pipeline
The pipeline supports hot-reloading for rapid development iteration.
Binary serialization optimizes runtime loading. Texture compression uses
BC7 for desktop and ASTC for mobile. Level of Detail generation creates
simplified mesh versions for distant objects. The asset dependency graph
tracks relationships to invalidate caches when source assets change.

---

## Android Custom ROM Architecture

### Boot Sequence
The boot process flows from BootROM to bootloader, either ABL or LK,
then to the Linux kernel, then to the init process, then to Zygote,
then to SystemServer, and finally to the Launcher application.

### Key Subsystems
Zygote is the pre-forked virtual machine that accelerates application
launches by forking a warm process rather than cold-starting a new runtime.

SystemServer hosts all system services including the ActivityManager,
PackageManager, WindowManager, and PowerManager.

Binder is the inter-process communication mechanism. Each process maintains
a thread pool to handle incoming binder transactions.

The Hardware Abstraction Layer bridges the Android framework to vendor
hardware. Legacy devices use HIDL interfaces. Android 12 and newer use AIDL.

### Build System
The Android Open Source Project uses the repo tool to synchronize multiple
Git repositories based on a manifest file. Soong processes Android build
files. Kati processes legacy makefiles. Ninja executes the build graph.

### Over-The-Air Updates
Seamless updates use A and B partition schemes. The inactive partition
receives the update while the active partition continues running. On next
boot, the system switches to the updated partition. If the update fails,
the system falls back to the previous partition.

---

## Linux Distribution Construction

### Bootstrap Stages
Stage zero builds the cross-compilation toolchain from source. Stage one
builds basic system utilities and a minimal shell environment. Stage two
builds the full build environment with compilers and build tools. Stage
three builds the package manager, desktop environment, and applications.

### Package Manager Design
The repository contains package metadata including name, version,
dependencies, and checksums. Binary packages use compressed archive formats.
A signature database verifies package integrity with cryptographic signatures.

The resolver builds a dependency graph as a directed acyclic graph. Complex
conflicts require a SAT solver for resolution. Transactions must be atomic
with rollback capability.

### Init System Comparison
Systemd provides parallel startup, service supervision, socket activation,
and log aggregation through journald. It is the most feature-complete but
also the most complex.

OpenRC provides parallel startup and limited service supervision. It uses
traditional syslog for logging.

Runit provides parallel startup and full service supervision. It uses
syslog for logging and has minimal complexity.

S6 provides parallel startup, full service supervision, and structured
logging through s6-log. It has minimal complexity and is suitable for
embedded systems.

### Desktop Environment
A Wayland compositor manages display output and input events. Wlroots
provides a modular base for custom compositors. PipeWire handles audio
routing and Bluetooth. Flatpak provides sandboxed application distribution.

### Installer
The installer partitions storage, configures Logical Volume Management
and LUKS encryption if requested, creates Btrfs subvolumes, sets up user
accounts and locale, and installs the bootloader.
