package com.example.order_service.DTO;

import java.util.List;

public class OrderRequest {
	
	 private Long userId;

	    private String address;

	    private String paymentMode;

	    private List<ItemRequest> items;

		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
		}

		public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
		}

		public String getPaymentMode() {
			return paymentMode;
		}

		public void setPaymentMode(String paymentMode) {
			this.paymentMode = paymentMode;
		}

		public List<ItemRequest> getItems() {
			return items;
		}

		public void setItems(List<ItemRequest> items) {
			this.items = items;
		}
	    
	    
	    

}
