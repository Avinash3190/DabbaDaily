package com.example.order_service.Entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {
	
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	 
	 private Long userId;
	 private String customername;
	 private String mobile;
	 private String address;
	 private Double totalAmount;
	 private String PaymentMode;
	 private String paymentStatus;

	    private Integer deliveryOtp;

	    private boolean otpVerified;

	    @Enumerated(EnumType.STRING)
	    private OrderStatus status;

	    private LocalDateTime orderDate;

	    @OneToMany(mappedBy = "order",
	            cascade = CascadeType.ALL)
	    private List<OrderItem> items;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Long getUserId() {
			return userId;
		}

		public void setUserId(Long userId) {
			this.userId = userId;
		}

		public String getCustomername() {
			return customername;
		}

		public void setCustomername(String customername) {
			this.customername = customername;
		}

		public String getMobile() {
			return mobile;
		}

		public void setMobile(String mobile) {
			this.mobile = mobile;
		}

		public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
		}

		public Double getTotalAmount() {
			return totalAmount;
		}

		public void setTotalAmount(Double totalAmount) {
			this.totalAmount = totalAmount;
		}

		public String getPaymentMode() {
			return PaymentMode;
		}

		public void setPaymentMode(String paymentMode) {
			PaymentMode = paymentMode;
		}

		public String getPaymentStatus() {
			return paymentStatus;
		}

		public void setPaymentStatus(String paymentStatus) {
			this.paymentStatus = paymentStatus;
		}

		public Integer getDeliveryOtp() {
			return deliveryOtp;
		}

		public void setDeliveryOtp(Integer deliveryOtp) {
			this.deliveryOtp = deliveryOtp;
		}

		public boolean isOtpVerified() {
			return otpVerified;
		}

		public void setOtpVerified(boolean otpVerified) {
			this.otpVerified = otpVerified;
		}

		public OrderStatus getStatus() {
			return status;
		}

		public void setStatus(OrderStatus status) {
			this.status = status;
		}

		public LocalDateTime getOrderDate() {
			return orderDate;
		}

		public void setOrderDate(LocalDateTime orderDate) {
			this.orderDate = orderDate;
		}

		public List<OrderItem> getItems() {
			return items;
		}

		public void setItems(List<OrderItem> items) {
			this.items = items;
		}

	    
	    
}
