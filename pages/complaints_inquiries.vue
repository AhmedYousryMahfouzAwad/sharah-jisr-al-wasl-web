<template>
  <!-- Main Content -->
  <div
    class="grid grid-cols-12 lg:container !mx-auto justify-center items-start"
  >
    <div class="col-span-6 my-5 mx-5">
      <p class="text-start my-3 font-bold text-lg">
        {{ t("pages.complaints_inquiries") }}
      </p>
      <div class="grid grid-cols-12 w-full rounded-full bg-primary-2 p-1 mb-4">
        <!-- New Complaints -->
        <button
          type="button"
          @click="handleSubTabChange('new')"
          :class="
            activeSubTab === 'new'
              ? 'bg-primary-1 text-white'
              : 'bg-primary-2 text-gray-600'
          "
          class="col-span-4 text-center text-sm font-bold rounded-full py-2"
        >
          {{ t("pages.new") }}
        </button>

        <!-- Processing Complaints -->
        <button
          type="button"
          @click="handleSubTabChange('processing')"
          :class="
            activeSubTab === 'processing'
              ? 'bg-primary-1 text-white'
              : 'bg-primary-2 text-gray-600'
          "
          class="col-span-4 text-sm text-center font-bold rounded-full py-2"
        >
          {{ t("pages.processing") }}
        </button>

        <!-- Completed Complaints -->
        <button
          type="button"
          @click="handleSubTabChange('completed')"
          :class="
            activeSubTab === 'completed'
              ? 'bg-primary-1 text-white'
              : 'bg-primary-2 text-gray-600'
          "
          class="col-span-4 text-sm text-center font-bold rounded-full py-2"
        >
          {{ t("pages.completed") }}
        </button>
      </div>

      <!-- ✅ Loading state while fetching data -->
      <div v-if="loading" class="text-center my-5">
        <p class="text-sm text-gray-600">{{ t("pages.loading") }}...</p>
      </div>

      <!-- ✅ Display complaints -->
      <HomeCardComplaintsIInquiries
        v-else
        :list_complaints_inquiries="list_complaints_inquiries"
      />
    </div>

    <div class="col-span-6 my-5 mx-5">
      <img
        src="/public/favicon.ico"
        class="justify-center items-center flex mx-auto"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { fetchData, resultData } = useFetchData();
const { t } = useI18n();

const activeSubTab = ref("new"); // ✅ Default to 'new' tab
const list_complaints_inquiries = ref([]); // ✅ Stores complaints data
const loading = ref(false); // ✅ Tracks loading state

const fetchComplaints = async () => {
  loading.value = true; // ✅ Start loading
  try {
    await fetchData({
      url: `api/user/complaints`,
      method: "get",
      params: { status: activeSubTab.value }, // ✅ Ensure the correct tab is passed
      onSuccess: () => {
        list_complaints_inquiries.value = resultData.value?.data || []; // ✅ Update the data correctly
        console.log("✅ Data fetched:", list_complaints_inquiries.value);
      },
    });
  } catch (error) {
    console.error("❌ Error fetching complaints:", error);
  } finally {
    loading.value = false; // ✅ Stop loading after request is done
  }
};

const handleSubTabChange = async (tab) => {
  if (activeSubTab.value === tab) return; // ❌ Prevent unnecessary API calls if the tab is already selected
  activeSubTab.value = tab; // ✅ Update the active tab
  await fetchComplaints(); // ✅ Fetch data when tab changes
};

// ✅ Ensure the API request runs on page load
onMounted(async () => {
  console.log("🔄 Fetching complaints on page load...");
  await fetchComplaints();
});
</script>

<style scoped>
/* Ensure white background is applied */
.bg-white {
  background-color: #ffffff !important;
}

/* Disable interaction with background image */
img.z-0 {
  pointer-events: none;
}

/* Adjust button style */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.p-tab-active {
  @apply !border-primary-1 !text-primary-1;
}

::v-root .active-bar-color {
  background-color: #c69e73 !important;
}

.active-tab {
  background-color: #c69e73;
  color: white;
}
.inactive-tab {
  background-color: #f3f3f3;
  color: black;
}

/* Dropdown Container */
.select-container {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 4px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Dropdown Option */
.select-option {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
}

.select-option:hover {
  background-color: #f9fafb;
}

.select-option img {
  width: 25px;
  height: 15px;
  border-radius: 3px;
  object-fit: cover;
  margin-right: 8px;
}

.select-option span {
  font-size: 14px;
  color: #1a202c;
}

/* Arrow Styling */
.dropdown-arrow {
  font-size: 10px !important;
  color: #a0aec0;
  margin-left: 4px;
}

/* Selected Item */
.selected-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}
.grid {
  align-items: center;
}

.relative {
  position: relative;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4299e1;
}
</style>
