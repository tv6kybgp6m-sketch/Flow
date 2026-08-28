/* ============================================
   记账本 Bookkeeping - App Logic
   ============================================ */

// ---- Default Data ----
const DEFAULT_EXPENSE_CATEGORIES = [
    { id: 'e_food', name: '餐饮', icon: 'fa-utensils', color: '#ff6b6b', type: 'expense' },
    { id: 'e_transport', name: '交通', icon: 'fa-car', color: '#4ecdc4', type: 'expense' },
    { id: 'e_renqing', name: '人情', icon: 'fa-hand-holding-heart', color: '#e84393', type: 'expense' },
    { id: 'e_jiayong', name: '家用', icon: 'fa-basket-shopping', color: '#feca57', type: 'expense' },
    { id: 'e_shuma', name: '数码', icon: 'fa-laptop', color: '#55a3ff', type: 'expense' },
    { id: 'e_other', name: '其他', icon: 'fa-ellipsis', color: '#636e72', type: 'expense' },
    { id: 'e_shuidianmei', name: '水电煤', icon: 'fa-bolt', color: '#fdcb6e', type: 'expense' },
    { id: 'e_jiayou', name: '加油', icon: 'fa-gas-pump', color: '#00cec9', type: 'expense' },
    { id: 'e_qingke', name: '请客', icon: 'fa-mug-hot', color: '#d63031', type: 'expense' },
    { id: 'e_xuexi', name: '学习', icon: 'fa-graduation-cap', color: '#6c5ce7', type: 'expense' },
    { id: 'e_entertain', name: '娱乐', icon: 'fa-gamepad', color: '#a29bfe', type: 'expense' },
    { id: 'e_comm', name: '通讯', icon: 'fa-phone', color: '#0984e3', type: 'expense' },
    { id: 'e_laopo', name: '老婆', icon: 'fa-heart', color: '#fd79a8', type: 'expense' },
    { id: 'e_baoxian', name: '保险', icon: 'fa-shield-heart', color: '#26de81', type: 'expense' },
    { id: 'e_baobao', name: '宝宝', icon: 'fa-baby', color: '#ff9ff3', type: 'expense' },
    { id: 'e_fahongbao', name: '发红包', icon: 'fa-gift', color: '#fc5c65', type: 'expense' },
    { id: 'e_fushi', name: '服饰', icon: 'fa-shirt', color: '#ff7a45', type: 'expense' },
    { id: 'e_yiyao', name: '医药', icon: 'fa-briefcase-medical', color: '#e17055', type: 'expense' },
    { id: 'e_housing', name: '住房', icon: 'fa-house', color: '#00b894', type: 'expense' },
    { id: 'e_meifa', name: '美发', icon: 'fa-scissors', color: '#9b59b6', type: 'expense' },
    { id: 'e_kuaidi', name: '快递', icon: 'fa-box', color: '#2d98da', type: 'expense' },
    { id: 'e_zhuangxiu', name: '装修', icon: 'fa-tools', color: '#b33939', type: 'expense' },
    { id: 'e_shoufu', name: '首付', icon: 'fa-building', color: '#84817a', type: 'expense' },
    { id: 'e_fangdai', name: '房贷', icon: 'fa-hand-holding-dollar', color: '#ee5253', type: 'expense' },
    { id: 'e_hunli', name: '婚礼', icon: 'fa-champagne-glasses', color: '#f368e0', type: 'expense' },
];

const DEFAULT_INCOME_CATEGORIES = [
    { id: 'i_ziji', name: '自己', icon: 'fa-user', color: '#00b894', type: 'income' },
    { id: 'i_xinzi', name: '薪资', icon: 'fa-money-bill-wave', color: '#0984e3', type: 'income' },
    { id: 'i_other', name: '其他', icon: 'fa-ellipsis', color: '#636e72', type: 'income' },
    { id: 'i_shouhongbao', name: '收红包', icon: 'fa-envelope-open', color: '#d63031', type: 'income' },
    { id: 'i_cai', name: '采', icon: 'fa-cart-shopping', color: '#feca57', type: 'income' },
    { id: 'i_taoke', name: '淘客', icon: 'fa-tags', color: '#e84393', type: 'income' },
    { id: 'i_zhuan', name: '转', icon: 'fa-right-left', color: '#6c5ce7', type: 'income' },
    { id: 'i_zhuanqian', name: '赚钱', icon: 'fa-coins', color: '#26de81', type: 'income' },
];

// 旧默认分类 → 新分类 的迁移映射（v2）
const CATEGORY_MIGRATION_V2 = {
    e_food: 'e_food', e_transport: 'e_transport', e_shopping: 'e_fushi', e_grocery: 'e_jiayong',
    e_entertain: 'e_entertain', e_housing: 'e_housing', e_medical: 'e_yiyao', e_education: 'e_xuexi',
    e_comm: 'e_comm', e_other: 'e_other',
    i_salary: 'i_xinzi', i_bonus: 'i_zhuanqian', i_invest: 'i_zhuanqian', i_parttime: 'i_zhuanqian',
    i_redpacket: 'i_shouhongbao', i_other: 'i_other',
};

const DEFAULT_PAYMENT_METHODS = ['微信支付', '支付宝', '现金', '银行卡', '信用卡', '其他'];

const ICON_OPTIONS = [
    'fa-utensils', 'fa-car', 'fa-bag-shopping', 'fa-basket-shopping',
    'fa-gamepad', 'fa-house', 'fa-briefcase-medical', 'fa-graduation-cap',
    'fa-mobile-screen', 'fa-ellipsis', 'fa-money-bill-wave', 'fa-gift',
    'fa-chart-line', 'fa-laptop', 'fa-red-envelope', 'fa-plane',
    'fa-film', 'fa-mug-hot', 'fa-shirt', 'fa-dumbbell',
    'fa-paw', 'fa-baby', 'fa-tools', 'fa-credit-card',
    'fa-bus', 'fa-train', 'fa-taxi', 'fa-bicycle',
];

const COLOR_OPTIONS = [
    '#ff6b6b', '#4ecdc4', '#ff9ff3', '#feca57', '#a29bfe',
    '#fd79a8', '#e17055', '#6c5ce7', '#00cec9', '#636e72',
    '#00b894', '#0984e3', '#e84393', '#d63031', '#fdcb6e',
    '#55a3ff', '#ff7a45', '#9b59b6', '#26de81', '#fc5c65',
];

// ---- State ----
let state = {
    transactions: [],
    categories: [...DEFAULT_EXPENSE_CATEGORIES, ...DEFAULT_INCOME_CATEGORIES],
    budgets: [],
    paymentMethods: [...DEFAULT_PAYMENT_METHODS],
    settings: { currency: '¥', theme: 'light', defaultPaymentMethod: '微信支付', defaultView: 'transactions', autoOpenAdd: false },
    currentView: 'transactions',
    transactionFilter: 'all',
    searchQuery: '',
    monthFilter: '',
    reportPeriod: 'month',
    reportYear: null,
    reportMonth: null,
    deleted: { transactions: [], categories: [], budgets: [], paymentMethods: [] },  // soft-delete markers
    pmAddedAt: {},          // payment method name -> when it was added (names are the identity)
    reportMetric: 'expense',
    reportChartType: 'line',
    reportGranularity: null,
    editingTransactionId: null,
    editingCategoryId: null,
    selectedTransactionType: 'expense',
    selectedCategoryType: 'expense',
    selectedCategoryId: null,
    selectedIcon: 'fa-utensils',
    selectedColor: '#ff6b6b',
};

let charts = {};

// ---- Storage ----
const STORAGE_KEY = 'bookkeeping_app_data';

function saveState() {
    const data = {
        transactions: state.transactions,
        categories: state.categories,
        budgets: state.budgets,
        paymentMethods: state.paymentMethods,
        settings: state.settings,
        categoryVersion: state.categoryVersion || 2,
        deleted: state.deleted,
        pmAddedAt: state.pmAddedAt,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Trigger iCloud sync (debounced)
    scheduleICloudSync();
}

// ---- Soft delete (tombstones) ----
// Deleting a record keeps a marker behind so the removal can travel to other
// devices: a plain union merge could only ever add rows, never remove them.
const TOMBSTONE_TTL_DAYS = 30;

function normalizeTombstones(raw) {
    const src = raw && typeof raw === 'object' ? raw : {};
    const clean = list => Array.isArray(list)
        ? list.filter(x => x && x.id && x.deletedAt).map(x => ({ id: String(x.id), deletedAt: Number(x.deletedAt) }))
        : [];
    return {
        transactions: clean(src.transactions),
        categories: clean(src.categories),
        budgets: clean(src.budgets),
        paymentMethods: clean(src.paymentMethods),
    };
}

function normalizeAddedAtMap(raw) {
    const out = {};
    if (raw && typeof raw === 'object') {
        Object.keys(raw).forEach(k => {
            const v = Number(raw[k]);
            if (k && v > 0) out[k] = v;
        });
    }
    return out;
}

function addTombstone(kind, id) {
    const list = state.deleted[kind];
    const existing = list.find(x => x.id === id);
    if (existing) existing.deletedAt = Date.now();
    else list.push({ id, deletedAt: Date.now() });
}

// Drop markers older than the retention window so the lists cannot grow forever.
function pruneTombstones() {
    const cutoff = Date.now() - TOMBSTONE_TTL_DAYS * 86400000;
    Object.keys(state.deleted).forEach(k => {
        state.deleted[k] = state.deleted[k].filter(x => x.deletedAt > cutoff);
    });
}

// Hide any live row a newer marker covers. A row edited after the deletion wins
// (last write wins), which is what lets an intentional re-add resurrect a record.
function applyTombstones() {
    const drop = (list, marks) => {
        if (!marks.length) return list;
        const byId = new Map(marks.map(m => [m.id, m.deletedAt]));
        return list.filter(item => {
            const at = byId.get(item.id);
            if (at === undefined) return true;
            return (item.updatedAt || item.createdAt || 0) > at;
        });
    };
    state.transactions = drop(state.transactions, state.deleted.transactions);
    state.categories = drop(state.categories, state.deleted.categories);
    state.budgets = drop(state.budgets, state.deleted.budgets);

    // Payment methods are plain strings with no per-row timestamp, so "when was
    // this added" lives in pmAddedAt. Unknown age counts as 0, i.e. a deletion
    // always wins unless the method was demonstrably re-added afterwards.
    const pmMarks = new Map(state.deleted.paymentMethods.map(m => [m.id, m.deletedAt]));
    if (pmMarks.size) {
        const kept = state.paymentMethods.filter(name => {
            const at = pmMarks.get(name);
            if (at === undefined) return true;
            return (state.pmAddedAt[name] || 0) > at;
        });
        // never leave the user without a payment method
        if (kept.length > 0) state.paymentMethods = kept;
    }
}

function mergeTombstoneList(local, remote) {
    const map = new Map((local || []).map(m => [m.id, m]));
    (remote || []).forEach(m => {
        if (!m || !m.id || !m.deletedAt) return;
        const cur = map.get(m.id);
        if (!cur || m.deletedAt > cur.deletedAt) map.set(m.id, m);
    });
    return Array.from(map.values());
}

// ---- iCloud Sync ----
let iCloudSyncTimer = null;
let iCloudSyncEnabled = false;
let iCloudLastSyncTime = null;

function isElectron() {
    return typeof window.electronAPI !== 'undefined' && window.electronAPI.isElectron;
}

function scheduleICloudSync() {
    if (!iCloudSyncEnabled) return;
    if (iCloudSyncTimer) clearTimeout(iCloudSyncTimer);
    iCloudSyncTimer = setTimeout(() => {
        syncToICloud();
    }, 3000);
}

async function initICloudSync() {
    if (!isElectron()) {
        // PWA mode - show manual import/export UI
        updateICloudSyncUI();
        return;
    }

    try {
        const available = await window.electronAPI.icloud.isAvailable();
        if (!available) {
            iCloudSyncEnabled = false;
            updateICloudSyncUI();
            return;
        }

        iCloudSyncEnabled = true;

        // Listen for file changes from other devices
        window.electronAPI.icloud.onFileChange((data) => {
            handleICloudFileChange(data);
        });

        // On startup, pull from iCloud and merge
        const remoteData = await window.electronAPI.icloud.readData();
        if (remoteData && remoteData.data) {
            mergeRemoteData(remoteData);
        }

        // Push current data to iCloud
        await syncToICloud();
        updateICloudSyncUI();
    } catch (e) {
        console.error('iCloud sync init error:', e);
    }
}

async function syncToICloud() {
    if (!iCloudSyncEnabled || !isElectron()) return;

    try {
        const syncData = {
            version: 1,
            lastModified: Date.now(),
            deviceName: 'Mac',
            data: {
                transactions: state.transactions,
                categories: state.categories,
                budgets: state.budgets,
                paymentMethods: state.paymentMethods,
                settings: state.settings,
                deleted: state.deleted,
                pmAddedAt: state.pmAddedAt,
            },
        };
        await window.electronAPI.icloud.writeData(syncData);
        iCloudLastSyncTime = Date.now();
        updateICloudSyncUI();
    } catch (e) {
        console.error('iCloud sync error:', e);
    }
}

function handleICloudFileChange(remoteData) {
    if (!remoteData || !remoteData.data) return;
    // Don't process our own writes
    if (remoteData.deviceName === 'Mac') return;

    mergeRemoteData(remoteData);
    renderView(state.currentView);
    showToast('已从 iCloud 同步最新数据', 'success');
}

function mergeRemoteData(remoteData) {
    const remote = remoteData.data;
    if (!remote) return;

    // Merge transactions: union by ID, keep latest
    const txnMap = new Map();
    state.transactions.forEach(t => txnMap.set(t.id, t));
    (remote.transactions || []).forEach(t => {
        const existing = txnMap.get(t.id);
        if (!existing) {
            txnMap.set(t.id, t);
        } else {
            const localTime = existing.updatedAt || existing.createdAt || 0;
            const remoteTime = t.updatedAt || t.createdAt || 0;
            if (remoteTime > localTime) {
                txnMap.set(t.id, t);
            }
        }
    });

    // Merge categories: union by ID
    const catMap = new Map();
    state.categories.forEach(c => catMap.set(c.id, c));
    (remote.categories || []).forEach(c => catMap.set(c.id, c));

    // Merge budgets: union by categoryId
    const budMap = new Map();
    state.budgets.forEach(b => budMap.set(b.categoryId, b));
    (remote.budgets || []).forEach(b => budMap.set(b.categoryId, b));

    // Merge payment methods: union by name, remember when each was added
    const pmSet = new Set(state.paymentMethods);
    (remote.paymentMethods || []).forEach(p => pmSet.add(p));
    state.paymentMethods = Array.from(pmSet);
    const remoteAddedAt = normalizeAddedAtMap(remoteData.data.pmAddedAt);
    Object.keys(remoteAddedAt).forEach(k => {
        if (!state.pmAddedAt[k] || remoteAddedAt[k] > state.pmAddedAt[k]) state.pmAddedAt[k] = remoteAddedAt[k];
    });

    // Merge the soft-delete markers, then let them hide any row they cover
    const remoteDeleted = normalizeTombstones(remoteData.data.deleted);
    state.deleted = {
        transactions: mergeTombstoneList(state.deleted.transactions, remoteDeleted.transactions),
        categories: mergeTombstoneList(state.deleted.categories, remoteDeleted.categories),
        budgets: mergeTombstoneList(state.deleted.budgets, remoteDeleted.budgets),
        paymentMethods: mergeTombstoneList(state.deleted.paymentMethods, remoteDeleted.paymentMethods),
    };

    state.transactions = Array.from(txnMap.values());
    state.categories = Array.from(catMap.values());
    state.budgets = Array.from(budMap.values());
    pruneTombstones();
    applyTombstones();

    // Settings: prefer remote if newer
    if (remoteData.lastModified > (iCloudLastSyncTime || 0)) {
        state.settings = { ...state.settings, ...remote.settings };
        document.documentElement.setAttribute('data-theme', state.settings.theme);
    }

    saveState(); // Save merged data locally
    iCloudLastSyncTime = Date.now();
    updateICloudSyncUI();
}

// PWA: Export to iCloud (download JSON)
function exportToICloud() {
    const syncData = {
        version: 1,
        lastModified: Date.now(),
        deviceName: 'iPhone',
        data: {
            transactions: state.transactions,
            categories: state.categories,
            budgets: state.budgets,
            paymentMethods: state.paymentMethods,
            settings: state.settings,
            deleted: state.deleted,
            pmAddedAt: state.pmAddedAt,
        },
    };
    const blob = new Blob([JSON.stringify(syncData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `accounting-sync.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    iCloudLastSyncTime = Date.now();
    updateICloudSyncUI();
    showToast('已导出同步文件，请保存到 iCloud Drive', 'success');
}

// PWA: Import from iCloud (file input)
function importFromICloud(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const remoteData = JSON.parse(e.target.result);
            if (remoteData.data) {
                mergeRemoteData(remoteData);
                renderView(state.currentView);
                showToast('已从 iCloud 导入并合并数据', 'success');
            } else {
                showToast('文件格式不正确', 'error');
            }
        } catch (err) {
            showToast('导入失败，文件格式错误', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function updateICloudSyncUI() {
    const container = document.getElementById('icloudSyncSection');
    if (!container) return;

    if (isElectron()) {
        if (iCloudSyncEnabled) {
            const timeStr = iCloudLastSyncTime
                ? new Date(iCloudLastSyncTime).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
                : '尚未同步';
            container.innerHTML = `
                <div class="icloud-status">
                    <div class="icloud-status-row">
                        <span class="icloud-status-dot active"></span>
                        <span class="icloud-status-text">iCloud 自动同步已启用</span>
                    </div>
                    <div class="icloud-status-info">上次同步: ${timeStr}</div>
                    <button class="secondary-btn" onclick="syncFromICloudNow()">
                        <i class="fa-solid fa-rotate"></i> 立即同步
                    </button>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="icloud-status">
                    <div class="icloud-status-row">
                        <span class="icloud-status-dot inactive"></span>
                        <span class="icloud-status-text">iCloud Drive 不可用</span>
                    </div>
                    <div class="icloud-status-info">请在系统设置中开启 iCloud Drive</div>
                </div>
            `;
        }
    } else {
        const timeStr = iCloudLastSyncTime
            ? new Date(iCloudLastSyncTime).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
            : '尚未同步';
        container.innerHTML = `
            <div class="icloud-status">
                <div class="settings-row">
                    <div class="settings-label">从 iCloud 导入<div class="settings-sublabel">从 iCloud Drive 选择同步文件</div></div>
                    <button class="secondary-btn" onclick="document.getElementById('icloudImportFile').click()">
                        <i class="fa-solid fa-cloud-arrow-down"></i> 导入
                    </button>
                    <input type="file" id="icloudImportFile" accept=".json" style="display:none" onchange="importFromICloud(event)">
                </div>
                <div class="settings-row">
                    <div class="settings-label">导出到 iCloud<div class="settings-sublabel">保存到 iCloud Drive 供其他设备同步</div></div>
                    <button class="secondary-btn" onclick="exportToICloud()">
                        <i class="fa-solid fa-cloud-arrow-up"></i> 导出
                    </button>
                </div>
                <div class="icloud-hint">
                    <i class="fa-solid fa-circle-info"></i>
                    Mac 端自动同步，手机端点「导入」即可获取 Mac 最新数据
                </div>
                <div class="icloud-status-info">上次操作: ${timeStr}</div>
            </div>
        `;
    }
}

async function syncFromICloudNow() {
    if (!isElectron() || !iCloudSyncEnabled) return;
    try {
        const remoteData = await window.electronAPI.icloud.readData();
        if (remoteData && remoteData.data) {
            mergeRemoteData(remoteData);
            renderView(state.currentView);
            showToast('已从 iCloud 同步最新数据', 'success');
        } else {
            showToast('iCloud 中暂无同步数据', 'info');
        }
    } catch (e) {
        showToast('同步失败', 'error');
    }
}

function loadState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        try {
            const data = JSON.parse(raw);
            state.transactions = data.transactions || [];
            state.categories = data.categories || [...DEFAULT_EXPENSE_CATEGORIES, ...DEFAULT_INCOME_CATEGORIES];
            state.budgets = data.budgets || [];
            state.paymentMethods = (data.paymentMethods && data.paymentMethods.length > 0)
                ? data.paymentMethods
                : [...DEFAULT_PAYMENT_METHODS];
            state.settings = { ...{ currency: '¥', theme: 'light', defaultPaymentMethod: '微信支付', defaultView: 'transactions', autoOpenAdd: false }, ...data.settings };
            state.deleted = normalizeTombstones(data.deleted);
            state.pmAddedAt = normalizeAddedAtMap(data.pmAddedAt);
            // 仪表盘页面已移除：旧设置迁移到交易记录
            if (state.settings.defaultView === 'dashboard') state.settings.defaultView = 'transactions';

            // 分类体系 v2 迁移：替换旧默认分类为新的，交易/预算的旧分类ID同步映射
            if (!data.categoryVersion || data.categoryVersion < 2) {
                const customCats = state.categories.filter(c => c.id.startsWith('c_'));
                state.categories = [...DEFAULT_EXPENSE_CATEGORIES, ...DEFAULT_INCOME_CATEGORIES, ...customCats];
                state.transactions.forEach(t => {
                    if (CATEGORY_MIGRATION_V2[t.categoryId]) t.categoryId = CATEGORY_MIGRATION_V2[t.categoryId];
                });
                state.budgets.forEach(b => {
                    if (CATEGORY_MIGRATION_V2[b.categoryId]) b.categoryId = CATEGORY_MIGRATION_V2[b.categoryId];
                });
                state.categoryVersion = 2;
            }
        } catch (e) {
            console.error('Failed to load state:', e);
        }
    }
}

// ---- Utils ----
function formatCurrency(amount) {
    const sym = state.settings.currency || '¥';
    const sign = amount < 0 ? '-' : '';
    const abs = Math.abs(amount);
    return sign + sym + abs.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dOnly = new Date(d);
    dOnly.setHours(0, 0, 0, 0);

    if (dOnly.getTime() === today.getTime()) return '今天';
    if (dOnly.getTime() === yesterday.getTime()) return '昨天';

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}年${month}月${day}日`;
}

// Short form used on narrow screens where the full date squeezes the row
function formatDateShort(dateStr) {
    const d = parseLocalDate(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dOnly = new Date(d); dOnly.setHours(0, 0, 0, 0);
    if (dOnly.getTime() === today.getTime()) return '今天';
    const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
    if (dOnly.getTime() === yesterday.getTime()) return '昨天';
    if (d.getFullYear() !== today.getFullYear()) return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
    return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function formatDateFull(dateStr) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function todayStr() {
    return formatDateFull(new Date().toISOString());
}

function nowTimeStr() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function getMonthKey(dateStr) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getMonthLabel(monthKey) {
    const [y, m] = monthKey.split('-');
    return `${y}年${parseInt(m)}月`;
}

function getCurrentMonthKey() {
    return getMonthKey(new Date().toISOString());
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function getCategoryById(id) {
    return state.categories.find(c => c.id === id);
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const iconMap = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
    toast.innerHTML = `<i class="fa-solid ${iconMap[type] || iconMap.success}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ---- Navigation ----
function switchView(viewName) {
    state.currentView = viewName;
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === viewName);
    });
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(`view-${viewName}`).classList.add('active');

    // Render the view
    renderView(viewName);
}

function renderView(viewName) {
    switch (viewName) {
        case 'transactions': renderTransactions(); break;
        case 'reports': renderReports(); break;
        case 'budget': renderBudget(); break;
        case 'categories': renderCategories(); break;
        case 'settings': renderSettings(); break;
    }
    // Sidebar month summary always reflects current month regardless of active view
    updateSidebarSummary();
}

// ---- Sidebar summary (desktop sidebar month card) ----
function updateSidebarSummary() {
    const si = document.getElementById('sidebarIncome');
    if (!si) return;
    const monthKey = getCurrentMonthKey();
    const monthTxns = state.transactions.filter(t => getMonthKey(t.date) === monthKey);
    const income = monthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = monthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = income - expense;

    si.textContent = formatCurrency(income);
    document.getElementById('sidebarExpense').textContent = formatCurrency(expense);
    document.getElementById('sidebarBalance').textContent = formatCurrency(balance);
    document.getElementById('sidebarMonth').textContent = getMonthLabel(monthKey);
}

function renderTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;

    const labels = [];
    const incomeData = [];
    const expenseData = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const mk = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        labels.push(`${d.getMonth() + 1}月`);
        const txns = state.transactions.filter(t => getMonthKey(t.date) === mk);
        incomeData.push(txns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0));
        expenseData.push(txns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0));
    }

    if (charts.trend) charts.trend.destroy();

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#98989d' : '#6e6e73';
    const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

    charts.trend = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: '收入',
                    data: incomeData,
                    backgroundColor: '#34c759',
                    borderRadius: 6,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                },
                {
                    label: '支出',
                    data: expenseData,
                    backgroundColor: '#ff3b30',
                    borderRadius: 6,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: textColor, font: { size: 12, family: '-apple-system' }, usePointStyle: true, pointStyle: 'circle', padding: 12 },
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${formatCurrency(ctx.raw)}`,
                    },
                },
            },
            scales: {
                x: { grid: { display: false }, ticks: { color: textColor, font: { size: 11 } } },
                y: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, font: { size: 11 }, callback: (v) => state.settings.currency + v },
                },
            },
        },
    });
}

function renderCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;

    const monthKey = getCurrentMonthKey();
    const monthExpenses = state.transactions.filter(t => t.type === 'expense' && getMonthKey(t.date) === monthKey);

    const catTotals = {};
    monthExpenses.forEach(t => {
        catTotals[t.categoryId] = (catTotals[t.categoryId] || 0) + t.amount;
    });

    const entries = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);
    const labels = entries.map(([id]) => getCategoryById(id)?.name || '未知');
    const data = entries.map(([, v]) => v);
    const colors = entries.map(([id]) => getCategoryById(id)?.color || '#636e72');

    if (charts.category) charts.category.destroy();

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#98989d' : '#6e6e73';

    if (data.length === 0) {
        charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: { labels: ['暂无数据'], datasets: [{ data: [1], backgroundColor: ['#e0e0e0'], borderWidth: 0 }] },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
            },
        });
        return;
    }

    charts.category = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 6 }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '62%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: textColor, font: { size: 11, family: '-apple-system' }, usePointStyle: true, pointStyle: 'circle', padding: 8, boxWidth: 8 },
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const total = data.reduce((s, v) => s + v, 0);
                            const pct = ((ctx.raw / total) * 100).toFixed(1);
                            return `${ctx.label}: ${formatCurrency(ctx.raw)} (${pct}%)`;
                        },
                    },
                },
            },
        },
    });
}

// ---- Transactions ----
function transactionItemHTML(t) {
    const cat = getCategoryById(t.categoryId);
    const icon = cat?.icon || 'fa-ellipsis';
    const color = cat?.color || '#636e72';
    const name = cat?.name || '未知';
    const sign = t.type === 'income' ? '+' : '-';
    const noteText = t.note ? t.note : name;
    const payment = t.paymentMethod || '现金';
    const paymentIcon = paymentIconFor(payment);

    return `
        <div class="transaction-item" onclick="editTransaction('${t.id}')">
            <div class="transaction-icon" style="background:${color}22;color:${color}">
                <i class="fa-solid ${icon}"></i>
            </div>
            <div class="transaction-info">
                <div class="transaction-category">${name}</div>
                <div class="transaction-note">${noteText} <span class="txn-payment"><i class="${paymentIcon}"></i> ${payment}</span></div>
            </div>
            <div class="transaction-date"><span class="date-full">${formatDate(t.date)}</span><span class="date-short">${formatDateShort(t.date)}</span></div>
            <div class="transaction-amount ${t.type}">${sign}${formatCurrency(t.amount)}</div>
        </div>
    `;
}

function renderTransactions() {
    updateMonthFilter();
    updateTransactionMonthSummary();

    let filtered = [...state.transactions];

    // Filter by type
    if (state.transactionFilter !== 'all') {
        filtered = filtered.filter(t => t.type === state.transactionFilter);
    }

    // Filter by month
    if (state.monthFilter) {
        filtered = filtered.filter(t => getMonthKey(t.date) === state.monthFilter);
    }

    // Filter by search
    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        filtered = filtered.filter(t => {
            const cat = getCategoryById(t.categoryId);
            return (t.note && t.note.toLowerCase().includes(q)) || (cat && cat.name.toLowerCase().includes(q));
        });
    }

    // Sort by date desc
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date) || b.createdAt - a.createdAt);

    const container = document.getElementById('allTransactions');
    const empty = document.getElementById('emptyTransactions');

    if (filtered.length === 0) {
        container.innerHTML = '';
        empty.classList.remove('hidden');
    } else {
        empty.classList.add('hidden');
        container.innerHTML = filtered.map(t => transactionItemHTML(t)).join('');
    }
}

function updateMonthFilter() {
    const select = document.getElementById('monthFilter');
    const months = [...new Set(state.transactions.map(t => getMonthKey(t.date)))].sort().reverse();
    const current = state.monthFilter;

    select.innerHTML = '<option value="">所有月份</option>' +
        months.map(m => `<option value="${m}" ${m === current ? 'selected' : ''}>${getMonthLabel(m)}</option>`).join('');
}

// Top-of-page month summary (income / expense / balance for current month)
function updateTransactionMonthSummary() {
    const card = document.getElementById('txnMonthSummary');
    if (!card) return;
    const monthKey = getCurrentMonthKey();
    const monthTxns = state.transactions.filter(t => getMonthKey(t.date) === monthKey);
    const income = monthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = monthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = income - expense;

    document.getElementById('tmsIncome').textContent = formatCurrency(income);
    document.getElementById('tmsExpense').textContent = formatCurrency(expense);
    document.getElementById('tmsBalance').textContent = formatCurrency(balance);
}

// ---- Transaction Modal ----
function openTransactionModal(id) {
    const modal = document.getElementById('transactionModal');
    const title = document.getElementById('transactionModalTitle');

    if (id) {
        state.editingTransactionId = id;
        const t = state.transactions.find(x => x.id === id);
        if (!t) return;
        title.textContent = '编辑交易';
        state.selectedTransactionType = t.type;
        state.selectedCategoryId = t.categoryId;
        setCalcValue(String(t.amount));
        document.getElementById('dateInput').value = t.date;
        document.getElementById('timeInput').value = t.time || nowTimeStr();
        document.getElementById('noteInput').value = t.note || '';
        renderPaymentOptions(t.paymentMethod);
    } else {
        state.editingTransactionId = null;
        title.textContent = '记一笔';
        state.selectedTransactionType = 'expense';
        state.selectedCategoryId = null;
        resetCalc();
        document.getElementById('dateInput').value = todayStr();
        document.getElementById('timeInput').value = nowTimeStr();
        document.getElementById('noteInput').value = '';
        renderPaymentOptions();
    }

    // Show delete button only when editing
    document.getElementById('deleteTxnBtn').style.display = id ? '' : 'none';

    // Update type toggle
    document.querySelectorAll('#transactionModal .type-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.type === state.selectedTransactionType);
    });

    // Update currency symbol
    document.getElementById('modalCurrency').textContent = state.settings.currency;

    // Render category picker
    renderCategoryPicker();

    modal.classList.remove('hidden');
    // Amount is now entered via the custom number pad below; no system keyboard needed
}

function closeTransactionModal() {
    document.getElementById('transactionModal').classList.add('hidden');
    state.editingTransactionId = null;
    state.selectedCategoryId = null;
}

// ---- Custom Calculator-style Number Pad ----
// State for the in-modal calculator: tracks the running expression so + / - can chain
const calc = {
    expr: '',      // running expression text, e.g. "10+20-5"
    justOp: false, // true if the last input was an operator (so the next digit starts fresh)
};

function resetCalc() {
    calc.expr = '';
    calc.justOp = false;
    renderCalc();
}

function setCalcValue(amount) {
    // Used when editing an existing transaction: prefill with the stored amount
    calc.expr = String(amount);
    calc.justOp = false;
    renderCalc();
}

function renderCalc() {
    const display = document.getElementById('amountInput');
    const exprEl = document.getElementById('amountExpression');
    const hidden = document.getElementById('amountValue');
    if (!display) return;

    // Compute the value that should appear in the big display
    let shown;
    if (!calc.expr) {
        shown = '';
    } else {
        // If the last char is an operator, evaluate so far to show running result
        const last = calc.expr[calc.expr.length - 1];
        if (last === '+' || last === '-') {
            shown = String(safeEval(calc.expr.slice(0, -1)));
        } else {
            shown = String(safeEval(calc.expr));
        }
    }
    display.value = shown;

    // Expression line shows the full expression (e.g. "10+20-5 = 25")
    const evaluated = (() => {
        if (!calc.expr) return '';
        const last = calc.expr[calc.expr.length - 1];
        if (last === '+' || last === '-') return '';
        const v = safeEval(calc.expr);
        if (isNaN(v) || !isFinite(v)) return '';
        return calc.expr + ' = ' + formatNum(v);
    })();
    exprEl.textContent = evaluated;

    // Hidden field stores the final numeric value used by saveTransaction()
    const finalVal = shown && !isNaN(parseFloat(shown)) ? parseFloat(shown) : 0;
    hidden.value = finalVal;
}

function safeEval(expr) {
    // Only allow digits, decimal points, and + / - operators
    if (!/^[\d+\-.\s]+$/.test(expr)) return NaN;
    try {
        // eslint-disable-next-line no-new-func
        return Function('"use strict"; return (' + expr + ')')();
    } catch (e) {
        return NaN;
    }
}

function formatNum(n) {
    // Trim trailing zeros for a clean display (e.g. 25 not 25.0)
    if (Number.isInteger(n)) return String(n);
    return n.toFixed(2).replace(/\.?0+$/, '');
}

function numpadPress(key) {
    if (key === '.') {
        // Add decimal only if the current number segment doesn't already have one
        const seg = currentSegment();
        if (seg.includes('.')) return;
        if (calc.justOp || !calc.expr) {
            calc.expr += (calc.expr && calc.justOp ? '' : '0.');
            calc.justOp = false;
        } else {
            calc.expr += '.';
        }
    } else if (key === '+' || key === '-') {
        if (!calc.expr) return; // need a number first
        const last = calc.expr[calc.expr.length - 1];
        if (last === '+' || last === '-') {
            // Replace the previous operator
            calc.expr = calc.expr.slice(0, -1) + key;
        } else {
            calc.expr += key;
        }
        calc.justOp = true;
    } else {
        // Digit
        if (calc.justOp) {
            // Start a new number after an operator
            calc.expr += key;
            calc.justOp = false;
        } else {
            // Avoid leading zeros (except "0.")
            const seg = currentSegment();
            if (seg === '0') {
                calc.expr = calc.expr.slice(0, -1) + key;
            } else {
                calc.expr += key;
            }
        }
    }
    renderCalc();
}

function currentSegment() {
    // The numeric segment after the last operator
    const m = calc.expr.match(/[+\-](?!.*[+\-])$/);
    return m ? calc.expr.slice(m.index + 1) : calc.expr;
}

function numpadBack() {
    if (!calc.expr) return;
    const last = calc.expr[calc.expr.length - 1];
    calc.expr = calc.expr.slice(0, -1);
    // After a backspace the user is in the middle of a number, not after an operator
    calc.justOp = (last === '+' || last === '-');
    renderCalc();
}

function numpadClear() {
    resetCalc();
}

function numpadQuickSave() {
    // Save the current transaction and immediately prepare for the next entry
    saveTransaction({ reopen: true });
}

function renderPaymentOptions(selected) {
    const sel = document.getElementById('paymentInput');
    const methods = state.paymentMethods;
    // Default: user setting (微信支付), fallback to first method
    const target = selected || state.settings.defaultPaymentMethod || '微信支付';
    const value = methods.includes(target) ? target : methods[0];
    sel.innerHTML = methods.map(p => `<option value="${p}" ${p === value ? 'selected' : ''}>${p}</option>`).join('');
}

function paymentIconFor(name) {
    return {
        '现金': 'fa-solid fa-money-bill-wave',
        '微信支付': 'fa-brands fa-weixin',
        '支付宝': 'fa-brands fa-alipay',
        '银行卡': 'fa-solid fa-building-columns',
        '信用卡': 'fa-solid fa-credit-card',
    }[name] || 'fa-solid fa-coins';
}

function renderPaymentMethodsManage() {
    const container = document.getElementById('paymentMethodsList');
    if (!container) return;
    container.innerHTML = state.paymentMethods.map(p => {
        const count = state.transactions.filter(t => (t.paymentMethod || '现金') === p).length;
        const isDefault = p === (state.settings.defaultPaymentMethod || '微信支付');
        return `
            <div class="pm-chip ${isDefault ? 'pm-chip-default' : ''}" onclick="setDefaultPaymentMethod('${p}')">
                <i class="${paymentIconFor(p)}"></i>
                <span>${p}</span>
                ${isDefault ? '<span class="pm-default-tag">默认</span>' : ''}
                <button class="pm-chip-delete" onclick="event.stopPropagation(); deletePaymentMethod('${p}')" title="删除">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `;
    }).join('');
}

function setDefaultPaymentMethod(name) {
    state.settings.defaultPaymentMethod = name;
    saveState();
    renderPaymentMethodsManage();
    showToast(`默认支付方式已设为「${name}」`, 'success');
}

function addPaymentMethod() {
    const input = document.getElementById('newPaymentInput');
    const name = input.value.trim();
    if (!name) { showToast('请输入支付方式名称', 'error'); return; }
    if (state.paymentMethods.includes(name)) { showToast('该支付方式已存在', 'error'); return; }
    state.paymentMethods.push(name);
    state.pmAddedAt[name] = Date.now();
    saveState();
    input.value = '';
    renderPaymentMethodsManage();
    showToast('支付方式已添加', 'success');
}

function deletePaymentMethod(name) {
    if (state.paymentMethods.length <= 1) {
        showToast('至少保留一种支付方式', 'error');
        return;
    }
    const count = state.transactions.filter(t => (t.paymentMethod || '现金') === name).length;
    if (count > 0) {
        showToast(`该支付方式有 ${count} 笔交易记录，无法删除`, 'error');
        return;
    }
    addTombstone('paymentMethods', name);
    state.paymentMethods = state.paymentMethods.filter(p => p !== name);
    if ((state.settings.defaultPaymentMethod || '微信支付') === name) {
        state.settings.defaultPaymentMethod = state.paymentMethods[0];
    }
    saveState();
    renderPaymentMethodsManage();
    showToast('支付方式已删除', 'success');
}

function renderCategoryPicker() {
    const container = document.getElementById('categoryPicker');
    const cats = state.categories.filter(c => c.type === state.selectedTransactionType);

    container.innerHTML = cats.map(c => `
        <div class="cat-pick-item ${c.id === state.selectedCategoryId ? 'selected' : ''}"
             onclick="selectCategory('${c.id}')">
            <div class="cat-pick-icon" style="background:${c.color}22;color:${c.color}">
                <i class="fa-solid ${c.icon}"></i>
            </div>
            <div class="cat-pick-name">${c.name}</div>
        </div>
    `).join('');

    // Auto-select first if none selected
    if (!state.selectedCategoryId && cats.length > 0) {
        state.selectedCategoryId = cats[0].id;
        renderCategoryPicker();
    }
}

function selectCategory(id) {
    state.selectedCategoryId = id;
    renderCategoryPicker();
}

function saveTransaction(opts = {}) {
    // Read the evaluated amount from the hidden field managed by the custom numpad
    const amount = parseFloat(document.getElementById('amountValue').value);
    const date = document.getElementById('dateInput').value;
    const note = document.getElementById('noteInput').value.trim();
    const paymentMethod = document.getElementById('paymentInput').value;

    if (!amount || amount <= 0) {
        showToast('请输入有效金额', 'error');
        return;
    }
    if (!date) {
        showToast('请选择日期', 'error');
        return;
    }
    if (!state.selectedCategoryId) {
        showToast('请选择分类', 'error');
        return;
    }

    if (state.editingTransactionId) {
        const t = state.transactions.find(x => x.id === state.editingTransactionId);
        if (t) {
            t.type = state.selectedTransactionType;
            t.amount = amount;
            t.categoryId = state.selectedCategoryId;
            t.date = date;
            t.time = document.getElementById('timeInput').value || nowTimeStr();
            t.note = note;
            t.paymentMethod = paymentMethod;
            t.updatedAt = Date.now();
        }
        showToast('交易已更新', 'success');
    } else {
        state.transactions.push({
            id: uid(),
            type: state.selectedTransactionType,
            amount,
            categoryId: state.selectedCategoryId,
            date,
            time: document.getElementById('timeInput').value || nowTimeStr(),
            note,
            paymentMethod,
            createdAt: Date.now(),
        });
        showToast(opts.reopen ? '已保存，继续记下一笔' : '交易已添加', 'success');
    }

    saveState();

    if (opts.reopen) {
        // Quick-save mode: keep modal open, reset the calculator and note for the next entry
        resetCalc();
        document.getElementById('noteInput').value = '';
        document.getElementById('timeInput').value = nowTimeStr();
        // Re-render to update the list behind the modal
        renderView(state.currentView);
    } else {
        closeTransactionModal();
        renderView(state.currentView);
    }
    refreshCategoryLedger();
}

function editTransaction(id) {
    openTransactionModal(id);
}

function deleteTransaction(id) {
    addTombstone('transactions', id);
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveState();
    showToast('交易已删除', 'success');
    renderView(state.currentView);
    refreshCategoryLedger();
}

function deleteTransactionFromModal() {
    if (!state.editingTransactionId) return;
    if (!confirm('确定要删除这条交易记录吗？删除后无法恢复。')) return;
    const id = state.editingTransactionId;
    closeTransactionModal();
    deleteTransaction(id);
}

// ---- Reports ----
function renderReportSelectors() {
    const yearWrap = document.getElementById('reportYearWrap');
    const monthWrap = document.getElementById('reportMonthWrap');
    const yearSelect = document.getElementById('reportYearSelect');
    const monthSelect = document.getElementById('reportMonthSelect');
    const now = new Date();

    // Collect all years from transactions + current year
    const years = [...new Set(state.transactions.map(t => new Date(t.date).getFullYear()))];
    years.push(now.getFullYear());
    const uniqueYears = [...new Set(years)].sort((a, b) => b - a);

    // Keep the selected year valid for the available data
    let currentYear = state.reportYear || now.getFullYear();
    if (!uniqueYears.includes(currentYear)) currentYear = uniqueYears[0];
    state.reportYear = currentYear;

    yearSelect.innerHTML = uniqueYears.map(y =>
        `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}年</option>`
    ).join('');

    const period = state.reportPeriod;
    yearWrap.classList.toggle('hidden', period === 'all');
    monthWrap.classList.toggle('hidden', period !== 'month');

    if (period === 'month') {
        const currentMonth = state.reportMonth || (now.getMonth() + 1);
        monthSelect.innerHTML = Array.from({ length: 12 }, (_, i) => i + 1).map(m =>
            `<option value="${m}" ${m === currentMonth ? 'selected' : ''}>${m}月</option>`
        ).join('');
    }
}

// ---- Reports: period helpers ----
function getReportRange() {
    const now = new Date();
    const period = state.reportPeriod;
    const selYear = state.reportYear || now.getFullYear();
    const selMonth = state.reportMonth || (now.getMonth() + 1);
    let start, end, label;

    if (period === 'all') {
        start = null;
        end = null;
        label = '全部时间';
    } else if (period === 'year') {
        start = new Date(selYear, 0, 1);
        end = new Date(selYear, 11, 31, 23, 59, 59);
        label = `${selYear}年`;
    } else {
        start = new Date(selYear, selMonth - 1, 1);
        end = new Date(selYear, selMonth, 0, 23, 59, 59);
        label = `${selYear}年${selMonth}月`;
    }
    return { period, selYear, selMonth, start, end, label };
}

// Stored dates are "YYYY-MM-DD..." strings; new Date() would read them as UTC
// midnight and shift the calendar day in non-UTC timezones. Build a local date.
function parseLocalDate(dateStr) {
    const [y, m, d] = String(dateStr).slice(0, 10).split('-').map(Number);
    if (!y || !m || !d) return new Date(dateStr);
    return new Date(y, m - 1, d, 12, 0, 0);
}

function inRange(dateStr, range) {
    if (!range.start) return true;
    const days = parseLocalDate(dateStr);
    return days >= range.start && days <= range.end;
}

function getReportFiltered() {
    const range = getReportRange();
    return { range, txns: state.transactions.filter(t => inRange(t.date, range)) };
}

// getDaysInMonth() takes a 0-indexed month; reports carry 1-indexed months
function monthDays(year, month1) {
    return getDaysInMonth(year, month1 + 1);
}

// Number of days covered by the current report period (for daily average)
function getReportDays(txns, range) {
    const now = new Date();
    if (range.period === 'all') {
        if (txns.length === 0) return 1;
        const times = txns.map(t => parseLocalDate(t.date).getTime());
        const first = new Date(Math.min(...times));
        first.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return Math.max(1, Math.floor((today - first) / 86400000) + 1);
    }
    if (range.period === 'year') {
        if (range.selYear === now.getFullYear()) {
            return Math.floor((now - new Date(range.selYear, 0, 1)) / 86400000) + 1;
        }
        return ((range.selYear % 4 === 0 && range.selYear % 100 !== 0) || range.selYear % 400 === 0) ? 366 : 365;
    }
    if (range.selYear === now.getFullYear() && range.selMonth === now.getMonth() + 1) {
        return now.getDate();
    }
    return monthDays(range.selYear, range.selMonth);
}

const METRIC_META = {
    income:  { name: '收入', color: '#34c759', light: 'rgba(52, 199, 89, 0.14)' },
    expense: { name: '支出', color: '#ff3b30', light: 'rgba(255, 59, 48, 0.14)' },
    balance: { name: '结余', color: '#007aff', light: 'rgba(0, 122, 255, 0.14)' },
};

function renderReports() {
    renderReportSelectors();

    const { range, txns } = getReportFiltered();
    const income = txns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = txns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = income - expense;
    const dailyAvg = expense / getReportDays(txns, range);

    document.getElementById('reportIncome').textContent = formatCurrency(income);
    document.getElementById('reportExpense').textContent = formatCurrency(expense);
    document.getElementById('reportBalance').textContent = formatCurrency(balance);
    document.getElementById('reportDailyAvg').textContent = formatCurrency(dailyAvg);

    renderDrillChart();
}

// ---- Reports: drill-down ----
const GRANULARITY_LABELS = { day: '按日', month: '按月', year: '按年' };
let drillRenderToken = 0;
let catLedgerTxns = [];
let catLedgerIds = [];
let catLedgerBucket = null;   // set when the ledger came from a trend point

function defaultGranularity(period) {
    return period === 'all' ? 'year' : (period === 'year' ? 'month' : 'day');
}

function activeGranularity() {
    return state.reportGranularity || defaultGranularity(state.reportPeriod);
}

function granularityValue(d, gran) {
    if (gran === 'year') return d.getFullYear();
    if (gran === 'month') return d.getFullYear() * 100 + d.getMonth();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function granularityLabel(v, gran) {
    if (gran === 'year') return `${v}年`;
    if (gran === 'month') return `${Math.floor(v / 100)}年${(v % 100) + 1}月`;
    return `${Math.floor((v % 10000) / 100)}月${v % 100}日`;
}

// Time buckets for the trend chart. A fixed calendar frame is used for the
// month/year periods so empty days and months still show up.
function buildBuckets(txns, range, gran) {
    let values = [];
    if (gran === 'day' && range.period === 'month') {
        const days = getDaysInMonth(range.selYear, range.selMonth);
        for (let d = 1; d <= days; d++) values.push(range.selYear * 10000 + range.selMonth * 100 + d);
    } else if (gran === 'month' && range.period === 'year') {
        for (let m = 0; m < 12; m++) values.push(range.selYear * 100 + m);
    } else if (gran === 'year' && range.period === 'year') {
        values = [range.selYear];
    } else {
        values = [...new Set(txns.map(t => granularityValue(parseLocalDate(t.date), gran)))].sort((a, b) => a - b);
    }
    const map = new Map(values.map(v => [v, []]));
    txns.forEach(t => {
        const bucket = map.get(granularityValue(parseLocalDate(t.date), gran));
        if (bucket) bucket.push(t);
    });
    return values.map(v => ({ value: v, label: granularityLabel(v, gran), txns: map.get(v) || [] }));
}

function bucketTotal(txns, metric) {
    const inc = txns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const exp = txns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return metric === 'income' ? inc : (metric === 'expense' ? exp : inc - exp);
}

// Category totals for the selected metric, plus the net/gross sums they add up to
function categoryTotals(txns, metric) {
    const type = metric === 'balance' ? null : metric;
    const totals = {};
    txns.forEach(t => {
        if (type && t.type !== type) return;
        const signed = (metric === 'balance' && t.type === 'expense') ? -t.amount : t.amount;
        totals[t.categoryId] = (totals[t.categoryId] || 0) + signed;
    });
    const entries = Object.entries(totals).map(([id, amount]) => ({ id, amount, signed: Math.abs(amount) }));
    const sums = {
        net: entries.reduce((s, e) => s + e.amount, 0),
        gross: entries.reduce((s, e) => s + e.signed, 0),
    };
    entries.sort((a, b) => b.signed - a.signed);
    return { entries, sums };
}

function updateReportToggleStates() {
    document.querySelectorAll('.report-card.clickable').forEach(card => {
        card.classList.toggle('active', card.dataset.metric === state.reportMetric);
    });
    document.querySelectorAll('.chart-type-toggle .type-ico-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.chart === state.reportChartType);
    });
    document.querySelectorAll('.gran-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.gran === activeGranularity());
    });
    const granWrap = document.getElementById('drillGranularity');
    if (granWrap) granWrap.classList.toggle('hidden', state.reportChartType === 'pie');
}

function setReportMetric(metric) {
    if (state.reportMetric === metric) return;
    state.reportMetric = metric;
    renderDrillChart();
}

function setReportChartType(type) {
    if (state.reportChartType === type) return;
    state.reportChartType = type;
    renderDrillChart();
}

function setReportGranularity(gran) {
    if (state.reportGranularity === gran) return;
    state.reportGranularity = gran;
    renderDrillChart();
}

function showDrillEmpty(message) {
    const empty = document.getElementById('drillChartEmpty');
    const canvasWrap = document.getElementById('drillChart').parentElement;
    empty.textContent = message;
    empty.classList.remove('hidden');
    canvasWrap.classList.add('hidden');
    if (charts.drill) { charts.drill.destroy(); charts.drill = null; }
    updateReportToggleStates();
}

function hideDrillEmpty() {
    document.getElementById('drillChartEmpty').classList.add('hidden');
    document.getElementById('drillChart').parentElement.classList.remove('hidden');
}

function drillTitles(metric, chartType, gran, range) {
    const meta = METRIC_META[metric];
    document.getElementById('drillChartTitle').textContent =
        chartType === 'pie' ? `${meta.name}构成占比` : `${meta.name}走势`;
    const parts = [range.label];
    if (chartType !== 'pie') parts.push(GRANULARITY_LABELS[gran]);
    parts.push('点击图表可查看明细');
    document.getElementById('drillChartSubtitle').textContent = parts.join(' · ');
}

function renderDrillChart() {
    const { range, txns } = getReportFiltered();
    const metric = state.reportMetric;
    const chartType = state.reportChartType;
    const gran = activeGranularity();
    const total = bucketTotal(txns, metric);

    drillTitles(metric, chartType, gran, range);
    updateReportToggleStates();
    renderBreakdownList();

    if (total === 0) {
        showDrillEmpty(`${range.label}暂无${METRIC_META[metric].name}记录`);
        return;
    }
    hideDrillEmpty();

    // Wait a frame so the canvas has a laid-out size (the view may have just become visible)
    const token = ++drillRenderToken;
    requestAnimationFrame(() => {
        if (token !== drillRenderToken) return;
        const ctx = document.getElementById('drillChart');
        if (!ctx) return;
        if (chartType === 'pie') renderDrillPie(ctx, txns, metric);
        else renderDrillTrend(ctx, txns, range, gran, metric, chartType);
    });
}

function chartPalette() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
        isDark,
        text: isDark ? '#98989d' : '#6e6e73',
        grid: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
    };
}

function openBucketLedger(bucketIndex) {
    const { range, txns } = getReportFiltered();
    const bucket = buildBuckets(txns, range, activeGranularity())[bucketIndex];
    if (!bucket) return;
    const metric = state.reportMetric;
    const scoped = metric === 'balance' ? bucket.txns : bucket.txns.filter(t => t.type === metric);
    openLedger({
        title: bucket.label,
        subtitle: `${METRIC_META[metric].name}明细 · ${range.label}`,
        ids: [],
        bucket: bucket.value,
        txns: scoped,
    });
}

function renderDrillTrend(ctx, txns, range, gran, metric, chartType) {
    if (charts.drill) { charts.drill.destroy(); charts.drill = null; }
    const legendBox = document.getElementById('pieLegend');
    if (legendBox) { legendBox.innerHTML = ''; legendBox.classList.add('hidden'); }
    const buckets = buildBuckets(txns, range, gran);
    const values = buckets.map(b => Math.round(bucketTotal(b.txns, metric) * 100) / 100);
    const palette = chartPalette();
    const meta = METRIC_META[metric];
    const accent = chartType === 'bar'
        ? values.map(v => (metric === 'balance' && v < 0) ? '#ff3b30' : meta.color)
        : meta.color;

    charts.drill = new Chart(ctx, {
        type: chartType,
        data: {
            labels: buckets.map(b => b.label),
            datasets: [{
                label: meta.name,
                data: values,
                borderColor: meta.color,
                backgroundColor: chartType === 'line' ? meta.light : accent,
                borderWidth: chartType === 'line' ? 2 : 0,
                fill: chartType === 'line',
                tension: 0.35,
                pointRadius: buckets.length > 20 ? 0 : 3,
                pointHoverRadius: 6,
                pointBackgroundColor: meta.color,
                borderRadius: 5,
                maxBarThickness: 44,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: (evt, elements) => {
                if (elements && elements.length) openBucketLedger(elements[0].index);
            },
            onHover: (evt, elements) => {
                const target = evt.native && evt.native.target;
                if (target) target.style.cursor = (elements && elements.length) ? 'pointer' : 'default';
            },
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: (c) => `${meta.name}: ${formatCurrency(c.raw)}` } },
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: palette.text,
                        font: { size: 10, family: '-apple-system' },
                        maxRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: gran === 'day' ? 12 : 14,
                    },
                },
                y: {
                    grid: { color: palette.grid },
                    ticks: { color: palette.text, font: { size: 10 }, callback: (v) => state.settings.currency + v },
                },
            },
        },
    });
}

// Draws "分类名 12.3%" beside each slice with a leader line (no extra plugin needed)
const pieLabelPlugin = {
    id: 'qwenPieLabels',
    afterDatasetsDraw(chart) {
        const arcs = chart.getDatasetMeta(0).data;
        if (!arcs.length) return;
        const cx = arcs[0].x;
        const cy = arcs[0].y;
        const r = arcs[0].outerRadius || 0;
        if (!r) return;

        const ctx = chart.ctx;
        const data = chart.data.datasets[0].data;
        const total = data.reduce((s, v) => s + Math.abs(v), 0);
        if (!total) return;
        const compact = chart.width < 520;

        ctx.save();
        ctx.font = `500 ${compact ? 10 : 11}px -apple-system, "PingFang SC", sans-serif`;
        ctx.textBaseline = 'middle';

        const sides = { right: [], left: [] };
        let drawn = 0;
        arcs.forEach((arc, i) => {
            const pct = (Math.abs(data[i]) / total) * 100;
            const mid = (arc.startAngle + arc.endAngle) / 2;
            sides[Math.cos(mid) < 0 ? 'left' : 'right'].push({
                color: arc.options.backgroundColor,
                mid,
                y: cy + Math.sin(mid) * r,
                full: `${chart.data.labels[i]} ${pct.toFixed(1)}%`,
                short: `${pct.toFixed(0)}%`,
                text: '',
            });
        });

        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#d1d1d6' : '#3a3a3c';
        const halo = isDark ? 'rgba(44,44,46,0.85)' : 'rgba(255,255,255,0.85)';

        ['right', 'left'].forEach(side => {
            const sign = side === 'right' ? 1 : -1;
            const items = sides[side];
            if (!items.length) return;
            const measure = t => ctx.measureText(t).width;
            const widestFull = items.reduce((w, it) => Math.max(w, measure(it.full)), 0);
            // narrow screens fall back to percentage-only labels so nothing is clipped
            const useFull = chart.width / 2 - widestFull - 22 >= r * 0.75;
            items.forEach(it => { it.text = useFull ? it.full : it.short; });
            const textW = items.reduce((w, it) => Math.max(w, measure(it.text)), 0);
            const labelR = Math.min(r + (compact ? 12 : 24), chart.width / 2 - textW - 20);
            if (labelR <= r * 0.7) return;
            const anchorX = cx + sign * (labelR + 10);
            // every slice gets a label, so the column is evenly spaced and the gap
            // shrinks to whatever the canvas height allows before lines are drawn
            const n = items.length;
            const gap = Math.max(10, Math.min(compact ? 14 : 16, (chart.height - 16) / n));
            const span = (n - 1) * gap;
            let startY = Math.max(8, Math.min(cy - span / 2, chart.height - 8 - span));
            items.sort((a, b) => a.y - b.y); // follow slice order top-to-bottom to avoid crossing lines
            items.forEach((it, i) => { it.y = startY + i * gap; });
            drawn += n;
            items.forEach(it => {
                const y = it.y;
                ctx.strokeStyle = it.color;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(cx + Math.cos(it.mid) * r, cy + Math.sin(it.mid) * r);
                ctx.lineTo(cx + sign * (labelR + 2), y);
                ctx.lineTo(anchorX - sign * 4, y);
                ctx.stroke();
                ctx.fillStyle = it.color;
                ctx.fillRect(sign > 0 ? anchorX : anchorX - 6, y - 3, 6, 6);
                ctx.textAlign = sign > 0 ? 'left' : 'right';
                const textX = sign > 0 ? anchorX + 10 : anchorX - 10;
                ctx.lineJoin = 'round';
                ctx.lineWidth = 4;
                ctx.strokeStyle = halo;
                ctx.strokeText(it.text, textX, y);
                ctx.fillStyle = textColor;
                ctx.fillText(it.text, textX, y);
            });
        });
        chart.$pieLabelCount = drawn;
        ctx.restore();
    },
};

const doughnutTotalPlugin = {
    id: 'qwenDoughnutTotal',
    afterDraw(chart) {
        const area = chart.chartArea;
        if (!area) return;
        const cx = (area.left + area.right) / 2;
        const cy = (area.top + area.bottom) / 2;
        const r = Math.min(area.right - area.left, area.bottom - area.top) / 2;
        if (!r) return;
        const text = chart.$centerText || {};
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const { ctx } = chart;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isDark ? '#98989d' : '#8e8e93';
        ctx.font = '500 11px -apple-system, "PingFang SC", sans-serif';
        ctx.fillText(text.label || '', cx, cy - r * 0.24);
        ctx.fillStyle = isDark ? '#f5f5f7' : '#1d1d1f';
        ctx.font = `700 ${Math.max(12, Math.min(19, r * 0.28))}px -apple-system, "PingFang SC", sans-serif`;
        ctx.fillText(text.value || '', cx, cy + r * 0.1);
        ctx.restore();
    },
};

// A doughnut with 20+ slivers is unreadable — keep the top slices and merge the tail
const PIE_MAX_SLICES = 10;
const PIE_OTHERS_COLOR = '#b2b2b7';

function topPieEntries(entries) {
    if (entries.length <= PIE_MAX_SLICES) return entries.map(e => ({ ...e, ids: [e.id] }));
    const top = entries.slice(0, PIE_MAX_SLICES).map(e => ({ ...e, ids: [e.id] }));
    const rest = entries.slice(PIE_MAX_SLICES);
    top.push({
        id: '__others__',
        ids: rest.map(e => e.id),
        name: `其余 ${rest.length} 项`,
        amount: rest.reduce((s, e) => s + e.amount, 0),
        signed: rest.reduce((s, e) => s + e.signed, 0),
    });
    return top;
}

function renderDrillPie(ctx, txns, metric) {
    if (charts.drill) { charts.drill.destroy(); charts.drill = null; }
    const { entries: allEntries, sums } = categoryTotals(txns, metric);
    const entries = topPieEntries(allEntries);
    const labels = entries.map(e => e.name || getCategoryById(e.id)?.name || '未知分类');
    const data = entries.map(e => e.signed);
    const colors = entries.map(e => e.id === '__others__' ? PIE_OTHERS_COLOR : (getCategoryById(e.id)?.color || '#8e8e8e'));
    const gross = sums.gross;

    // leave room beside the ring for the leader-line labels on phones
    const narrow = (ctx.parentElement ? ctx.parentElement.clientWidth : 999) < 520;
    charts.drill = new Chart(ctx, {
        type: 'doughnut',
        data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 10, radius: narrow ? '78%' : '100%' }]},
        plugins: [pieLabelPlugin, doughnutTotalPlugin],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '52%',
            layout: { padding: { left: 28, right: 28, top: 10, bottom: 10 } },
            onClick: (evt, elements) => {
                if (!elements || !elements.length) return;
                const entry = entries[elements[0].index];
                if (entry) openLedgerForEntries(entry);
            },
            onHover: (evt, elements) => {
                const target = evt.native && evt.native.target;
                if (target) target.style.cursor = (elements && elements.length) ? 'pointer' : 'default';
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (c) => {
                            const pct = gross ? ((c.raw / gross) * 100).toFixed(1) : '0.0';
                            const value = metric === 'balance' ? entries[c.dataIndex].amount : c.raw;
                            return `${c.label}: ${formatCurrency(value)} (${pct}%)`;
                        },
                    },
                },
            },
        },
    });
    charts.drill.$centerText = { label: `${METRIC_META[metric].name}合计`, value: formatCurrency(sums.net) };
    renderPieLegend(entries, gross, metric);
}

// Colour-key list under the doughnut: the canvas labels drop to percent-only on
// narrow screens, so the category names live here instead
function renderPieLegend(entries, gross, metric) {
    const box = document.getElementById('pieLegend');
    if (!box) return;
    if (!entries || entries.length === 0 || gross <= 0) {
        box.innerHTML = '';
        pieLegendEntries = [];
        box.classList.add('hidden');
        return;
    }
    pieLegendEntries = entries;
    box.innerHTML = entries.map((e, i) => {
        const cat = e.id === '__others__' ? null : getCategoryById(e.id);
        const color = e.id === '__others__' ? PIE_OTHERS_COLOR : (cat?.color || '#8e8e8e');
        const name = cat?.name || e.name || '未知分类';
        const pct = ((e.signed / gross) * 100).toFixed(1);
        return `<div class="pie-legend-item" onclick="openPieLegendEntry(${i})">
            <span class="pl-dot" style="background:${color}"></span>
            <span class="pl-name">${name}</span>
            <span class="pl-pct">${pct}%</span>
        </div>`;
    }).join('');
    box.classList.remove('hidden');
}

let pieLegendEntries = [];

function openPieLegendEntry(i) {
    const entry = pieLegendEntries[i];
    if (entry) openLedgerForEntries(entry);
}

function renderBreakdownList() {
    const container = document.getElementById('drillBreakdownList');
    if (!container) return;
    const { range, txns } = getReportFiltered();
    const metric = state.reportMetric;
    const hint = document.getElementById('drillBreakdownHint');
    document.getElementById('drillBreakdownTitle').textContent = `${METRIC_META[metric].name}分类明细`;

    const { entries, sums } = categoryTotals(txns, metric);
    if (entries.length === 0) {
        hint.textContent = '点击分类查看每笔流水';
        container.innerHTML = `<div class="breakdown-empty">${range.label}暂无${METRIC_META[metric].name}记录</div>`;
        return;
    }
    // 结余按净额的占比展示，收入/支出按流水总额的占比展示
    const denominator = metric === 'balance' ? sums.net : sums.gross;
    hint.textContent = metric === 'balance' ? '占比 = 该分类净额 ÷ 净结余' : '点击分类查看每笔流水';
    const top = entries[0].signed || 1;
    // show every category, not just the leading ones
    const rows = entries.map((e, i) => {
        const cat = getCategoryById(e.id);
        const color = cat?.color || '#8e8e8e';
        const pct = denominator ? ((metric === 'balance' ? e.amount : e.signed) / denominator) * 100 : 0;
        const sign = metric === 'balance' && e.amount < 0 ? '-' : '';
        return `
            <div class="breakdown-item" onclick="openLedgerForCategory('${e.id}')">
                <div class="breakdown-icon" style="background:${color}22;color:${color}">
                    <i class="fa-solid ${cat?.icon || 'fa-ellipsis'}"></i>
                </div>
                <div class="breakdown-main">
                    <div class="breakdown-head">
                        <span class="breakdown-name">${cat?.name || '未知分类'}<span class="breakdown-rank">${i + 1}</span></span>
                        <span class="breakdown-amount">${sign}${formatCurrency(Math.abs(e.amount))}<em>${pct.toFixed(1)}%</em></span>
                    </div>
                    <div class="breakdown-bar"><div class="breakdown-fill" style="width:${Math.max(3, (e.signed / top) * 100)}%;background:${color}"></div></div>
                </div>
                <i class="fa-solid fa-chevron-right breakdown-arrow"></i>
            </div>`;
    }).join('');
    container.innerHTML = rows;
}

// ---- Reports: ledger modal (category / trend bucket) ----
function openLedgerForCategory(categoryId) {
    openLedgerForEntries({ id: categoryId, ids: [categoryId] });
}

function openLedgerForEntries(entry) {
    const { range, txns } = getReportFiltered();
    const metric = state.reportMetric;
    const ids = entry.ids || [entry.id];
    const cat = ids.length === 1 ? getCategoryById(ids[0]) : null;
    openLedger({
        title: cat?.name || entry.name || '其他分类',
        subtitle: `${range.label} · ${METRIC_META[metric].name}`,
        ids,
        txns: ledgerScope(txns, ids, metric),
    });
}

function ledgerScope(txns, ids, metric) {
    const set = new Set(ids || []);
    return txns.filter(t => {
        if (set.size && !set.has(t.categoryId)) return false;
        return metric === 'balance' || t.type === metric;
    });
}

function openLedger({ title, subtitle, ids, txns, bucket = null }) {
    catLedgerTxns = txns;
    catLedgerIds = ids || [];
    catLedgerBucket = bucket;
    const single = catLedgerIds.length === 1 ? getCategoryById(catLedgerIds[0]) : null;
    const color = single?.color || 'var(--accent)';
    const iconEl = document.getElementById('catTxnIcon');
    iconEl.style.background = single ? `${color}22` : 'var(--accent-light)';
    iconEl.style.color = color;
    iconEl.innerHTML = `<i class="fa-solid ${single?.icon || 'fa-list-ul'}"></i>`;
    document.getElementById('catTxnTitle').textContent = title;
    document.getElementById('catTxnSubtitle').textContent = subtitle;
    renderCategoryLedger();
    document.getElementById('categoryTxnModal').classList.remove('hidden');
}

function renderCategoryLedger() {
    const list = document.getElementById('catTxnList');
    const empty = document.getElementById('catTxnEmpty');
    const sorted = [...catLedgerTxns].sort((a, b) => new Date(b.date) - new Date(a.date) || b.createdAt - a.createdAt);
    const income = sorted.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expense = sorted.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const summary = document.getElementById('catTxnSummary');

    if (sorted.length === 0) {
        list.innerHTML = '';
        summary.innerHTML = '<span class="cat-txn-summary-item">暂无记录</span>';
        empty.classList.remove('hidden');
        return;
    }
    empty.classList.add('hidden');
    const parts = [`<span class="cat-txn-summary-item">共 <b>${sorted.length}</b> 笔</span>`];
    const single = catLedgerIds.length === 1 ? getCategoryById(catLedgerIds[0]) : null;
    if (single) {
        parts.push(`<span class="cat-txn-summary-item ${single.type}">${single.type === 'income' ? '收入' : '支出'}合计 <b>${formatCurrency(single.type === 'income' ? income : expense)}</b></span>`);
    } else {
        parts.push(`<span class="cat-txn-summary-item income">收入 <b>${formatCurrency(income)}</b></span>`,
            `<span class="cat-txn-summary-item expense">支出 <b>${formatCurrency(expense)}</b></span>`);
    }
    summary.innerHTML = parts.join('');
    list.innerHTML = sorted.map(t => transactionItemHTML(t)).join('');
}

function closeCategoryTxnModal() {
    document.getElementById('categoryTxnModal').classList.add('hidden');
    catLedgerTxns = [];
    catLedgerIds = [];
    catLedgerBucket = null;
}

// Keep an open ledger in sync after add / edit / delete
function refreshCategoryLedger() {
    const modal = document.getElementById('categoryTxnModal');
    if (modal.classList.contains('hidden')) return;
    const { txns } = getReportFiltered();
    if (catLedgerBucket !== null) {
        const gran = activeGranularity();
        const inBucket = t => granularityValue(parseLocalDate(t.date), gran) === catLedgerBucket;
        catLedgerTxns = txns.filter(t => inBucket(t) && (state.reportMetric === 'balance' || t.type === state.reportMetric));
    } else {
        catLedgerTxns = ledgerScope(txns, catLedgerIds, state.reportMetric);
    }
    renderCategoryLedger();
}

function initReportDrillListeners() {
    document.querySelectorAll('.report-card.clickable').forEach(card => {
        card.addEventListener('click', () => setReportMetric(card.dataset.metric));
    });
    document.querySelectorAll('.chart-type-toggle .type-ico-btn').forEach(btn => {
        btn.addEventListener('click', () => setReportChartType(btn.dataset.chart));
    });
    document.querySelectorAll('.gran-btn').forEach(btn => {
        btn.addEventListener('click', () => setReportGranularity(btn.dataset.gran));
    });
}

// ---- Budget ----
function renderBudget() {
    const monthKey = getCurrentMonthKey();
    const monthExpenses = state.transactions.filter(t => t.type === 'expense' && getMonthKey(t.date) === monthKey);

    const totalBudget = state.budgets.reduce((s, b) => s + b.amount, 0);
    const totalSpent = state.budgets.reduce((s, b) => {
        const spent = monthExpenses.filter(t => t.categoryId === b.categoryId).reduce((s2, t) => s2 + t.amount, 0);
        return s + Math.min(spent, b.amount);
    }, 0);

    document.getElementById('totalBudget').textContent = formatCurrency(totalBudget);
    document.getElementById('totalSpent').textContent = formatCurrency(totalSpent);

    const totalPct = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;
    const fillEl = document.getElementById('totalProgress');
    fillEl.style.width = totalPct + '%';
    fillEl.style.background = totalPct > 90 ? '#ff3b30' : totalPct > 70 ? '#ff9500' : '#007aff';

    const container = document.getElementById('budgetList');
    const empty = document.getElementById('emptyBudget');

    if (state.budgets.length === 0) {
        container.innerHTML = '';
        empty.classList.remove('hidden');
        return;
    }

    empty.classList.add('hidden');
    container.innerHTML = state.budgets.map(b => {
        const cat = getCategoryById(b.categoryId);
        const spent = monthExpenses.filter(t => t.categoryId === b.categoryId).reduce((s, t) => s + t.amount, 0);
        const pct = b.amount > 0 ? Math.round((spent / b.amount) * 100) : 0;
        const overflow = pct > 100;
        const barColor = overflow ? '#ff3b30' : pct > 80 ? '#ff9500' : cat?.color || '#007aff';
        const barWidth = Math.min(pct, 100);

        return `
            <div class="budget-item">
                <div class="budget-item-icon" style="background:${cat?.color || '#636e72'}22;color:${cat?.color || '#636e72'}">
                    <i class="fa-solid ${cat?.icon || 'fa-wallet'}"></i>
                </div>
                <div class="budget-item-info">
                    <div class="budget-item-name">${cat?.name || '未知'}</div>
                    <div class="budget-item-detail">${formatCurrency(spent)} / ${formatCurrency(b.amount)}</div>
                    <div class="budget-item-bar">
                        <div class="budget-item-fill" style="width:${barWidth}%;background:${barColor}"></div>
                    </div>
                </div>
                <div class="budget-item-actions">
                    <span class="budget-item-percent" style="color:${overflow ? '#ff3b30' : 'var(--text-primary)'}">${pct}%</span>
                    <button class="budget-delete" onclick="deleteBudget('${b.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    }).join('');
}

function openBudgetModal() {
    const select = document.getElementById('budgetCategorySelect');
    const expenseCats = state.categories.filter(c => c.type === 'expense');
    select.innerHTML = expenseCats.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    document.getElementById('budgetAmountInput').value = '';
    document.getElementById('budgetModal').classList.remove('hidden');
}

function closeBudgetModal() {
    document.getElementById('budgetModal').classList.add('hidden');
}

function saveBudget() {
    const categoryId = document.getElementById('budgetCategorySelect').value;
    const amount = parseFloat(document.getElementById('budgetAmountInput').value);

    if (!categoryId) { showToast('请选择分类', 'error'); return; }
    if (!amount || amount <= 0) { showToast('请输入有效金额', 'error'); return; }

    const existing = state.budgets.find(b => b.categoryId === categoryId);
    if (existing) {
        existing.amount = amount;
    } else {
        state.budgets.push({ id: uid(), categoryId, amount });
    }

    saveState();
    closeBudgetModal();
    renderBudget();
    showToast('预算已设置', 'success');
}

function deleteBudget(id) {
    addTombstone('budgets', id);
    state.budgets = state.budgets.filter(b => b.id !== id);
    saveState();
    renderBudget();
    showToast('预算已删除', 'success');
}

// ---- Categories ----
function renderCategories() {
    const expenseContainer = document.getElementById('expenseCategories');
    const incomeContainer = document.getElementById('incomeCategories');

    const expenseCats = state.categories.filter(c => c.type === 'expense');
    const incomeCats = state.categories.filter(c => c.type === 'income');

    const catCardHTML = (c) => {
        const count = state.transactions.filter(t => t.categoryId === c.id).length;
        return `
            <div class="category-card" data-id="${c.id}" data-type="${c.type}">
                <div class="category-card-icon" style="background:${c.color}22;color:${c.color}">
                    <i class="fa-solid ${c.icon}"></i>
                </div>
                <div>
                    <div class="category-card-name">${c.name}</div>
                    <div class="category-card-count">${count} 笔交易</div>
                </div>
            </div>
        `;
    };

    expenseContainer.innerHTML = expenseCats.map(catCardHTML).join('');
    incomeContainer.innerHTML = incomeCats.map(catCardHTML).join('');
    renderPaymentMethodsManage();
}

function openCategoryModal(id) {
    const modal = document.getElementById('categoryModal');
    const title = document.getElementById('categoryModalTitle');

    if (id) {
        state.editingCategoryId = id;
        const c = state.categories.find(x => x.id === id);
        if (!c) return;
        title.textContent = '编辑分类';
        state.selectedCategoryType = c.type;
        state.selectedIcon = c.icon;
        state.selectedColor = c.color;
        document.getElementById('catNameInput').value = c.name;
    } else {
        state.editingCategoryId = null;
        title.textContent = '新建分类';
        state.selectedCategoryType = 'expense';
        state.selectedIcon = 'fa-utensils';
        state.selectedColor = '#ff6b6b';
        document.getElementById('catNameInput').value = '';
    }

    document.querySelectorAll('#categoryModal .type-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.catType === state.selectedCategoryType);
    });

    renderIconPicker();
    renderColorPicker();
    modal.classList.remove('hidden');
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.add('hidden');
    state.editingCategoryId = null;
}

function renderIconPicker() {
    const container = document.getElementById('iconPicker');
    container.innerHTML = ICON_OPTIONS.map(icon => `
        <div class="icon-pick-item ${icon === state.selectedIcon ? 'selected' : ''}"
             onclick="selectIcon('${icon}')">
            <i class="fa-solid ${icon}"></i>
        </div>
    `).join('');
}

function renderColorPicker() {
    const container = document.getElementById('colorPicker');
    container.innerHTML = COLOR_OPTIONS.map(color => `
        <div class="color-pick-item ${color === state.selectedColor ? 'selected' : ''}"
             style="background:${color}"
             onclick="selectColor('${color}')"></div>
    `).join('');
}

function selectIcon(icon) {
    state.selectedIcon = icon;
    renderIconPicker();
}

function selectColor(color) {
    state.selectedColor = color;
    renderColorPicker();
}

function saveCategory() {
    const name = document.getElementById('catNameInput').value.trim();
    if (!name) { showToast('请输入分类名称', 'error'); return; }

    if (state.editingCategoryId) {
        const c = state.categories.find(x => x.id === state.editingCategoryId);
        if (c) {
            c.name = name;
            c.icon = state.selectedIcon;
            c.color = state.selectedColor;
            c.type = state.selectedCategoryType;
        }
        showToast('分类已更新', 'success');
    } else {
        state.categories.push({
            id: 'c_' + uid(),
            name,
            icon: state.selectedIcon,
            color: state.selectedColor,
            type: state.selectedCategoryType,
        });
        showToast('分类已创建', 'success');
    }

    saveState();
    closeCategoryModal();
    renderCategories();
}

function moveCategory(id, direction) {
    const idx = state.categories.findIndex(c => c.id === id);
    if (idx === -1) return;
    const cat = state.categories[idx];

    // Find adjacent category of the same type
    let targetIdx = -1;
    if (direction === 'up') {
        for (let i = idx - 1; i >= 0; i--) {
            if (state.categories[i].type === cat.type) { targetIdx = i; break; }
        }
    } else {
        for (let i = idx + 1; i < state.categories.length; i++) {
            if (state.categories[i].type === cat.type) { targetIdx = i; break; }
        }
    }
    if (targetIdx === -1) return; // already at boundary

    // Swap positions
    [state.categories[idx], state.categories[targetIdx]] = [state.categories[targetIdx], state.categories[idx]];
    saveState();
    renderCategories();
}

function deleteCategory(id) {
    const cat = state.categories.find(c => c.id === id);
    if (!cat) return;
    const count = state.transactions.filter(t => t.categoryId === id).length;
    if (count > 0) {
        showToast(`该分类下有 ${count} 笔交易，无法删除`, 'error');
        return;
    }
    const sameTypeCount = state.categories.filter(c => c.type === cat.type).length;
    if (sameTypeCount <= 1) {
        showToast(cat.type === 'income' ? '至少保留一个收入分类' : '至少保留一个支出分类', 'error');
        return;
    }
    if (!confirm(`确定删除分类「${cat.name}」吗？`)) return;
    addTombstone('categories', id);
    state.budgets.filter(b => b.categoryId === id).forEach(b => addTombstone('budgets', b.id));
    state.categories = state.categories.filter(c => c.id !== id);
    state.budgets = state.budgets.filter(b => b.categoryId !== id);
    saveState();
    renderCategories();
    showToast('分类已删除', 'success');
}

// ---- Category action sheet (tap) & drag-to-reorder (long press) ----
let catSheetId = null;
let catDrag = null;          // active drag session
let catPress = null;         // pending long press
let catSuppressClick = false;

function openCatActionSheet(id) {
    const c = state.categories.find(x => x.id === id);
    if (!c) return;
    catSheetId = id;
    const icon = document.getElementById('catSheetIcon');
    icon.style.background = c.color + '22';
    icon.style.color = c.color;
    icon.innerHTML = `<i class="fa-solid ${c.icon}"></i>`;
    document.getElementById('catSheetTitle').textContent = c.name;
    document.getElementById('catActionSheet').classList.remove('hidden');
}

function closeCatActionSheet() {
    document.getElementById('catActionSheet').classList.add('hidden');
    catSheetId = null;
}

function catSheetEdit() {
    const id = catSheetId;
    closeCatActionSheet();
    if (id) openCategoryModal(id);
}

function catSheetMove(direction) {
    const id = catSheetId;
    closeCatActionSheet();
    if (id) moveCategory(id, direction);
}

function catSheetDelete() {
    const id = catSheetId;
    closeCatActionSheet();
    if (id) deleteCategory(id);
}

function catCardFromEvent(e) {
    let el = e.target;
    while (el && el !== document) {
        if (el.classList && el.classList.contains('category-card') && el.dataset && el.dataset.id) return el;
        el = el.parentElement;
    }
    return null;
}

function onCatListClick(e) {
    if (catSuppressClick) { catSuppressClick = false; return; }
    const card = catCardFromEvent(e);
    if (card) openCatActionSheet(card.dataset.id);
}

// Long press = 450ms hold without moving
const CAT_PRESS_MS = 450;
const CAT_MOVE_TOLERANCE = 10;

function onCatTouchStart(e) {
    if (catDrag) return;
    const card = catCardFromEvent(e);
    if (!card) return;
    const t = e.touches[0];
    catPress = { card, x: t.clientX, y: t.clientY, timer: null };
    catPress.timer = setTimeout(() => startCatDrag(t.clientX, t.clientY), CAT_PRESS_MS);
}

function onCatTouchMove(e) {
    if (catDrag) {
        e.preventDefault();
        const t = e.touches[0];
        moveCatDrag(t.clientX, t.clientY);
        return;
    }
    if (!catPress) return;
    const t = e.touches[0];
    if (Math.abs(t.clientX - catPress.x) > CAT_MOVE_TOLERANCE ||
        Math.abs(t.clientY - catPress.y) > CAT_MOVE_TOLERANCE) {
        clearTimeout(catPress.timer);
        catPress = null;
    }
}

function onCatTouchEnd() {
    if (catDrag) { endCatDrag(); return; }
    if (catPress) { clearTimeout(catPress.timer); catPress = null; }
}

function onCatMouseDown(e) {
    if (catDrag || e.button !== 0) return;
    const card = catCardFromEvent(e);
    if (!card) return;
    catPress = { card, x: e.clientX, y: e.clientY, timer: null };
    catPress.timer = setTimeout(() => startCatDrag(e.clientX, e.clientY), CAT_PRESS_MS);
}

function onCatMouseMove(e) {
    if (catDrag) { moveCatDrag(e.clientX, e.clientY); return; }
    if (!catPress) return;
    if (Math.abs(e.clientX - catPress.x) > 5 || Math.abs(e.clientY - catPress.y) > 5) {
        clearTimeout(catPress.timer);
        catPress = null;
    }
}

function onCatMouseUp() {
    if (catDrag) { endCatDrag(); return; }
    if (catPress) { clearTimeout(catPress.timer); catPress = null; }
}

function startCatDrag(clientX, clientY) {
    if (!catPress) return;
    const card = catPress.card;
    catPress = null;
    const list = card.parentElement;
    if (!list) return;
    const rect = card.getBoundingClientRect();

    // Floating clone that follows the finger / cursor
    const ghost = card.cloneNode(true);
    ghost.classList.add('cat-drag-ghost');
    ghost.style.width = rect.width + 'px';
    ghost.style.left = rect.left + 'px';
    ghost.style.top = rect.top + 'px';
    document.body.appendChild(ghost);

    // Placeholder marks the drop slot in the list
    const placeholder = document.createElement('div');
    placeholder.className = 'cat-drag-placeholder';
    placeholder.style.height = rect.height + 'px';
    list.insertBefore(placeholder, card);
    card.style.display = 'none';

    catDrag = {
        id: card.dataset.id,
        type: card.dataset.type,
        list,
        ghost,
        placeholder,
        offX: clientX - rect.left,
        offY: clientY - rect.top
    };
    document.body.classList.add('cat-dragging');
    try { if (navigator.vibrate) navigator.vibrate(15); } catch (err) { /* ignore */ }
}

function moveCatDrag(x, y) {
    if (!catDrag) return;
    catDrag.ghost.style.left = (x - catDrag.offX) + 'px';
    catDrag.ghost.style.top = (y - catDrag.offY) + 'px';

    // Move placeholder to the slot under the finger (same list only)
    const cards = Array.from(catDrag.list.querySelectorAll('.category-card'))
        .filter(el => el.dataset.id !== catDrag.id);
    for (const el of cards) {
        const r = el.getBoundingClientRect();
        if (y < r.top + r.height / 2) {
            catDrag.list.insertBefore(catDrag.placeholder, el);
            return;
        }
    }
    catDrag.list.appendChild(catDrag.placeholder);
}

function endCatDrag() {
    if (!catDrag) return;
    const { id, type, list, ghost, placeholder } = catDrag;

    // Which card comes right after the drop slot? (skip the hidden source card)
    let nextEl = placeholder.nextElementSibling;
    if (nextEl && nextEl.dataset && nextEl.dataset.id === id) nextEl = nextEl.nextElementSibling;
    const nextId = (nextEl && nextEl.dataset && nextEl.dataset.id) ? nextEl.dataset.id : null;

    ghost.remove();
    placeholder.remove();
    document.body.classList.remove('cat-dragging');

    // Rebuild the order of this type's categories
    const ids = state.categories.filter(c => c.type === type).map(c => c.id);
    const newIds = ids.filter(i => i !== id);
    let insertAt = newIds.length;
    if (nextId) {
        const idx = newIds.indexOf(nextId);
        if (idx !== -1) insertAt = idx;
    }
    newIds.splice(insertAt, 0, id);

    const byId = {};
    state.categories.forEach(c => { byId[c.id] = c; });
    let k = 0;
    state.categories = state.categories.map(c => c.type === type ? byId[newIds[k++]] : c);

    catDrag = null;
    catSuppressClick = true; // swallow the click that follows pointerup
    saveState();
    renderCategories();
    showToast('分类顺序已更新', 'success');
}

function initCategoryInteractions() {
    ['expenseCategories', 'incomeCategories'].forEach(listId => {
        const list = document.getElementById(listId);
        if (!list) return;
        list.addEventListener('click', onCatListClick);
        list.addEventListener('touchstart', onCatTouchStart, { passive: true });
        list.addEventListener('touchmove', onCatTouchMove, { passive: false });
        list.addEventListener('touchend', onCatTouchEnd);
        list.addEventListener('touchcancel', onCatTouchEnd);
        list.addEventListener('mousedown', onCatMouseDown);
    });
    document.addEventListener('mousemove', onCatMouseMove);
    document.addEventListener('mouseup', onCatMouseUp);
}

// ---- Settings ----
function renderSettings() {
    document.getElementById('currencySelect').value = state.settings.currency;
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === state.settings.theme);
    });
    const dvSelect = document.getElementById('defaultViewSelect');
    if (dvSelect) dvSelect.value = state.settings.defaultView || 'transactions';
    const autoToggle = document.getElementById('autoOpenAddToggle');
    if (autoToggle) autoToggle.checked = !!state.settings.autoOpenAdd;
    updateICloudSyncUI();
}

function applyTheme(theme) {
    state.settings.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    saveState();
    // Re-render charts with new colors
    if (state.currentView === 'reports') renderReports();
}

function setDefaultView(view) {
    state.settings.defaultView = view;
    saveState();
    showToast('已设置默认打开页面', 'success');
}

function setAutoOpenAdd(enabled) {
    state.settings.autoOpenAdd = enabled;
    saveState();
    showToast(enabled ? '已开启启动自动弹出记一笔' : '已关闭启动自动弹出', 'success');
}

// ---- Data Export/Import (Excel) ----
function exportData() {
    if (typeof XLSX === 'undefined') {
        showToast('Excel 库未加载，请刷新页面重试', 'error');
        console.error('XLSX library not loaded');
        return;
    }

    try {
        const wb = XLSX.utils.book_new();

        // Sheet 1: Transactions
        const txnData = state.transactions.map(t => {
            const cat = getCategoryById(t.categoryId);
            return {
                '日期': t.date,
                '时间': t.time || '',
                '类型': t.type === 'income' ? '收入' : '支出',
                '分类': cat?.name || '未知',
                '金额': t.amount,
                '支付方式': t.paymentMethod || '现金',
                '备注': t.note || '',
            };
        });
        const ws1 = XLSX.utils.json_to_sheet(txnData);
        ws1['!cols'] = [{wch:14},{wch:10},{wch:8},{wch:12},{wch:14},{wch:12},{wch:24}];
        XLSX.utils.book_append_sheet(wb, ws1, '交易记录');

        // Sheet 2: Categories
        const catData = state.categories.map(c => ({
            'ID': c.id,
            '名称': c.name,
            '类型': c.type === 'income' ? '收入' : '支出',
            '图标': c.icon,
            '颜色': c.color,
        }));
        const ws2 = XLSX.utils.json_to_sheet(catData);
        ws2['!cols'] = [{wch:20},{wch:14},{wch:8},{wch:20},{wch:14}];
        XLSX.utils.book_append_sheet(wb, ws2, '分类');

        // Sheet 3: Budgets
        const budData = state.budgets.map(b => {
            const cat = getCategoryById(b.categoryId);
            return {
                '分类': cat?.name || '未知',
                '预算金额': b.amount,
            };
        });
        const ws3 = XLSX.utils.json_to_sheet(budData);
        ws3['!cols'] = [{wch:20},{wch:14}];
        XLSX.utils.book_append_sheet(wb, ws3, '预算');

        // Use XLSX.write to generate binary, then download via Blob
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `记账本-${formatDateFull(new Date().toISOString())}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 500);

        showToast('数据已导出为 Excel (.xlsx)', 'success');
    } catch (err) {
        console.error('Export error:', err);
        showToast('导出失败: ' + err.message, 'error');
    }
}

function normalizeImportDate(v) {
    if (v == null || v === '') return todayStr();
    if (v instanceof Date && !isNaN(v.getTime())) {
        return `${v.getFullYear()}-${String(v.getMonth() + 1).padStart(2, '0')}-${String(v.getDate()).padStart(2, '0')}`;
    }
    if (typeof v === 'number' && isFinite(v)) {
        // Excel serial date: days since 1899-12-30
        const ms = Math.round((v - 25569) * 86400000);
        const d = new Date(ms);
        if (!isNaN(d.getTime()) && v > 20000 && v < 80000) {
            return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
        }
        return todayStr();
    }
    const s = String(v).trim();
    // 2017-01-05 / 2017/1/5 / 2017.01.05 / 2017年1月5日
    const m = s.match(/^(\d{4})[-\/.年]\s*(\d{1,2})[-\/.月]\s*(\d{1,2})日?$/);
    if (m) return `${m[1]}-${String(m[2]).padStart(2, '0')}-${String(m[3]).padStart(2, '0')}`;
    const d = new Date(s);
    if (!isNaN(d.getTime())) {
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }
    return todayStr();
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (typeof XLSX === 'undefined') {
        showToast('Excel 库未加载，请刷新页面重试', 'error');
        event.target.value = '';
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const wb = XLSX.read(data, { type: 'array', cellDates: true });

            // Parse categories first (transactions reference them)
            const ws2 = wb.Sheets['分类'];
            if (ws2) {
                const catRows = XLSX.utils.sheet_to_json(ws2);
                state.categories = catRows.map(row => ({
                    id: row['ID'] || ('c_' + uid()),
                    name: row['名称'] || '未知',
                    type: row['类型'] === '收入' ? 'income' : 'expense',
                    icon: row['图标'] || 'fa-ellipsis',
                    color: row['颜色'] || '#636e72',
                }));
            }

            // Parse transactions
            const ws1 = wb.Sheets['交易记录'];
            if (ws1) {
                const txnRows = XLSX.utils.sheet_to_json(ws1);
                state.transactions = txnRows.map(row => {
                    const catName = row['分类'];
                    const cat = state.categories.find(c => c.name === catName);
                    const typeStr = row['类型'];
                    return {
                        id: uid(),
                        type: typeStr === '收入' ? 'income' : 'expense',
                        amount: parseFloat(row['金额']) || 0,
                        categoryId: cat?.id || (typeStr === '收入' ? 'i_other' : 'e_other'),
                        date: normalizeImportDate(row['日期']),
                        time: row['时间'] || '',
                        note: row['备注'] || '',
                        paymentMethod: row['支付方式'] || '现金',
                        createdAt: Date.now(),
                    };
                });
                // Auto-register unknown payment methods from imported data
                txnRows.forEach(row => {
                    const pm = (row['支付方式'] || '').trim();
                    if (pm && !state.paymentMethods.includes(pm)) {
                        state.paymentMethods.push(pm);
                        state.pmAddedAt[pm] = Date.now();
                    }
                });
            }

            // Parse budgets
            const ws3 = wb.Sheets['预算'];
            if (ws3) {
                const budRows = XLSX.utils.sheet_to_json(ws3);
                state.budgets = budRows.map(row => {
                    const catName = row['分类'];
                    const cat = state.categories.find(c => c.name === catName);
                    return {
                        id: uid(),
                        categoryId: cat?.id || 'e_other',
                        amount: parseFloat(row['预算金额']) || 0,
                    };
                });
            }

            saveState();
            applyTheme(state.settings.theme);
            renderView(state.currentView);
            showToast('Excel 数据已导入', 'success');
        } catch (err) {
            console.error('Import error:', err);
            showToast('导入失败，文件格式错误', 'error');
        }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
}

function loadSampleData() {
    const now = new Date();
    const samples = [];
    const expenseCats = DEFAULT_EXPENSE_CATEGORIES;
    const incomeCats = DEFAULT_INCOME_CATEGORIES;

    // Generate 3 months of data
    for (let m = 2; m >= 0; m--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - m, 1);
        const daysInMonth = getDaysInMonth(monthDate.getFullYear(), monthDate.getMonth() + 1);
        const maxDay = m === 0 ? now.getDate() : daysInMonth;

        // Monthly salary
        if (m < 2) {
            samples.push({
                id: uid(), type: 'income', amount: 12000 + Math.floor(Math.random() * 2000),
                categoryId: 'i_xinzi', date: `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}-01`,
                note: '月度工资', createdAt: Date.now() - m * 1000000,
            });
        }

        // Random expenses
        for (let d = 1; d <= maxDay; d++) {
            const numTxns = Math.floor(Math.random() * 4);
            for (let i = 0; i < numTxns; i++) {
                const cat = expenseCats[Math.floor(Math.random() * expenseCats.length)];
                let amount;
                if (cat.id === 'e_housing') amount = 3000 + Math.random() * 500;
                else if (cat.id === 'e_food') amount = 15 + Math.random() * 80;
                else if (cat.id === 'e_transport') amount = 5 + Math.random() * 50;
                else if (cat.id === 'e_shopping') amount = 50 + Math.random() * 300;
                else amount = 10 + Math.random() * 100;

                samples.push({
                    id: uid(), type: 'expense', amount: Math.round(amount * 100) / 100,
                    categoryId: cat.id,
                    date: `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
                    note: '', createdAt: Date.now() - m * 1000000 + d * 1000 + i,
                });
            }
        }

        // Occasional income
        if (m === 0 && Math.random() > 0.5) {
            samples.push({
                id: uid(), type: 'income', amount: 500 + Math.floor(Math.random() * 1000),
                categoryId: 'i_zhuanqian', date: `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}-15`,
                note: '项目奖金', createdAt: Date.now() - 500000,
            });
        }
    }

    state.transactions = samples;
    state.budgets = [
        { id: uid(), categoryId: 'e_food', amount: 2000 },
        { id: uid(), categoryId: 'e_transport', amount: 500 },
        { id: uid(), categoryId: 'e_shopping', amount: 1500 },
        { id: uid(), categoryId: 'e_entertain', amount: 800 },
    ];
    saveState();
    renderView(state.currentView);
    showToast('示例数据已加载', 'success');
}

function clearAllData() {
    if (!confirm('确定要清空所有数据吗？此操作不可恢复。')) return;
    state.transactions = [];
    state.budgets = [];
    state.categories = [...DEFAULT_EXPENSE_CATEGORIES, ...DEFAULT_INCOME_CATEGORIES];
    state.deleted = normalizeTombstones(null);
    state.pmAddedAt = {};
    saveState();
    renderView(state.currentView);
    showToast('所有数据已清空', 'success');
}

// ---- Event Listeners ----
function initEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            switchView(item.dataset.view);
        });
    });

    // Link buttons
    document.querySelectorAll('[data-goto]').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.goto));
    });

    // Transaction type toggle
    document.querySelectorAll('#transactionModal .type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.selectedTransactionType = btn.dataset.type;
            state.selectedCategoryId = null;
            document.querySelectorAll('#transactionModal .type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCategoryPicker();
        });
    });

    // Category type toggle
    document.querySelectorAll('#categoryModal .type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.selectedCategoryType = btn.dataset.catType;
            document.querySelectorAll('#categoryModal .type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            state.transactionFilter = tab.dataset.filter;
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderTransactions();
        });
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderTransactions();
    });

    // Month filter
    document.getElementById('monthFilter').addEventListener('change', (e) => {
        state.monthFilter = e.target.value;
        renderTransactions();
    });

    // Report period
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.reportPeriod = btn.dataset.period;
            state.reportGranularity = null; // fall back to the period's natural granularity
            document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderReports();
        });
    });

    // Report drill-down (metric cards / chart type / granularity)
    initReportDrillListeners();

    // Report year/month selectors
    document.getElementById('reportYearSelect').addEventListener('change', (e) => {
        state.reportYear = parseInt(e.target.value);
        renderReports();
    });

    document.getElementById('reportMonthSelect').addEventListener('change', (e) => {
        state.reportMonth = parseInt(e.target.value);
        renderReports();
    });

    // Currency
    document.getElementById('currencySelect').addEventListener('change', (e) => {
        state.settings.currency = e.target.value;
        saveState();
        renderView(state.currentView);
        showToast('货币已更新', 'success');
    });

    // Theme
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            applyTheme(btn.dataset.theme);
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (state.currentView === 'reports') renderReports();
        });
    });

    // Modal overlay click to close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                if (overlay.id === 'categoryTxnModal') closeCategoryTxnModal();
                else overlay.classList.add('hidden');
            }
        });
    });

    // Custom number pad: numbers, decimal, operators, backspace
    document.querySelectorAll('.numpad-num, .numpad-op').forEach(btn => {
        btn.addEventListener('click', () => numpadPress(btn.dataset.key));
    });
    document.getElementById('numpadBack').addEventListener('click', numpadBack);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Cmd+N / Ctrl+N: Quick add (jumps to transactions view)
        if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
            e.preventDefault();
            switchView('transactions');
            openTransactionModal();
        }
        // Escape: Close the topmost modal
        if (e.key === 'Escape') {
            if (!document.getElementById('categoryTxnModal').classList.contains('hidden')) {
                closeCategoryTxnModal();
            } else {
                document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
            }
        }
        // Enter in note input: Save (works since amount input is now readonly)
        if (e.key === 'Enter' && document.activeElement?.id === 'noteInput') {
            saveTransaction();
        }
        // Numeric / operator keys when the transaction modal is open
        if (!document.getElementById('transactionModal').classList.contains('hidden')) {
            if (/^[0-9.+\-]$/.test(e.key)) {
                e.preventDefault();
                numpadPress(e.key);
            } else if (e.key === 'Backspace') {
                e.preventDefault();
                numpadBack();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                saveTransaction();
            }
        }
    });

    // Traffic lights (just for fun)
    document.querySelector('.traffic-light-red').addEventListener('click', () => {
        showToast('记账本保持运行中', 'info');
    });
    document.querySelector('.traffic-light-yellow').addEventListener('click', () => {
        showToast('最小化功能暂未启用', 'info');
    });
    document.querySelector('.traffic-light-green').addEventListener('click', () => {
        showToast('记账本已就绪', 'info');
    });
}

// ---- Init ----
function init() {
    loadState();
    pruneTombstones();
    applyTombstones();
    document.documentElement.setAttribute('data-theme', state.settings.theme);
    initEventListeners();
    initCategoryInteractions();
    switchView(state.settings.defaultView || 'transactions');

    // Auto-load sample data on first visit
    if (state.transactions.length === 0 && !localStorage.getItem(STORAGE_KEY + '_visited')) {
        localStorage.setItem(STORAGE_KEY + '_visited', '1');
        loadSampleData();
    }

    // Auto-open transaction modal on launch if enabled
    if (state.settings.autoOpenAdd) {
        setTimeout(() => openTransactionModal(), 300);
    }

    // Initialize iCloud sync
    setTimeout(() => initICloudSync(), 500);
}

document.addEventListener('DOMContentLoaded', init);
